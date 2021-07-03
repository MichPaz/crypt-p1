# int to str binary formated
def format_binary(b):
    n = format(b, 'b')
    for i in range(4 - len(n)):
        n = '0' + n
    return n

def format_byte(b):
    n = format(b, 'b')
    for i in range(8 - len(n)):
        n = '0' + n
    return n

def add_mod(n1, n2):
    return (n1 + n2) % 16


def format_plain_text(text):
    a_byte_array = bytearray(text, "utf8")

    # print('a_byte_array')
    # print(a_byte_array)

    text_formated = ''

    for byte in a_byte_array:
        text_formated += format_byte(int(format(byte, 'b'),2))

    space_c = int((len(text_formated)%16)/8)
    text_formated += format_byte(160) * space_c

    return text_formated

def mul_mod(n1, n2):
    if n1 == 0:
        n1 = 16
    if n2 == 0:
        n2 = 16

    mult = (n1 * n2) % 17

    if (mult==16):
        mult = 0
    return mult

def add_inv(n):
    return -n

def mul_inv(n):
    inverted = ~n -1
    # print('mul_inv')
    # if(mul_mod(n, inverted)==0):
    #     print('oooooooooooooooooooooooooooo')
    # print(mul_mod(n, inverted))
    # print(n)
    return (inverted)

def xor(n1, n2):
    return (n1 ^ n2)


def rotate(key):
    return key[6:] + key[:6]

def generate_u_keys(keys):
    u = []


    # keys = []
    # for i in range(1, 29):
    #     keys.append(i)

    for i  in range (6):
        # print(len(keys))
        u += keys[len(keys)-4:]
        u[(i)*6] = mul_inv(u[(i)*6])
        u[(i*6)+1] = add_inv(u[(i*6)+1])
        u[(i*6)+2] = add_inv(u[(i*6)+2])
        u[(i*6)+3] = mul_inv(u[(i*6)+3])
        if(len(keys)>4):
            u.append(keys[len(keys)-6])
            u.append(keys[len(keys)-5])
            keys = keys[:len(keys)-6]
        else:
            break
    # print('len(u)')
    # print(len(u))
    return u


def generate_keys(key):
    key = str(key)
    rotate_keys = [key]
    rotate_keys.append(rotate(rotate_keys[0]))
    rotate_keys.append(rotate(rotate_keys[1]))
    rotate_keys.append(rotate(rotate_keys[2]))

    rt_keys = ''
    for i in range(4):
        rt_keys += rotate_keys[i]

    keys = []
    for i in range(28):
        key_binary = int(rt_keys[(i*4):((i+1)*4)], 2)
        keys.append(key_binary)

    return keys

def format_input_rounds(plain_text):
    ''.join(format(ord(x), 'b') for x in plain_text)
    plain_text = str(plain_text)
    x = []
    for i in range(4):
        # print(plain_text[(i*4):((i+1)*4)])
        x.append(int(plain_text[(i*4):((i+1)*4)], 2))

    return x


def half_round(x, keys):
    # print('-'*10+'half_round'+'-'*10)
    # print('x')
    # print(x)
    # print('keys')
    # print(keys)

    p1 = mul_mod(x[0], keys[0])
    p2 = add_mod(x[2], keys[1])
    p3 = add_mod(x[1], keys[2])
    p4 = mul_mod(x[3], keys[3])

    return format_binary(p1) + format_binary(p2) + format_binary(p3) + format_binary(p4)


def round(x, keys):
    # print('-'*10+'round'+'-'*10)
    # print('x')
    # print(x)
    # print('keys')
    # print(keys)
    p1 = mul_mod(x[0], keys[0])
    p2 = add_mod(x[1], keys[1])
    p3 = add_mod(x[2], keys[2])
    p4 = mul_mod(x[3], keys[3])

    p5 = xor(p1, p3)
    p6 = xor(p2, p4)

    p7 = mul_mod(p5, keys[4])
    p8 = add_mod(p6, p7)
    p9 = mul_mod(p8, keys[5])
    p10 = add_mod(p7, p9)

    p11 = xor(p1, p9)
    p12 = xor(p3, p9)
    p13 = xor(p2, p10)
    p14 = xor(p4, p10)

    # print('output')
    # print([p11, p13, p12, p14])
    return [p11, p13, p12, p14]



def encrypt(plain_text, keys, key):
    cipher_text = ''
    plain_text = format_plain_text(plain_text)
    for i in range(int(len(plain_text)/16)):
        k = keys[:6]
        keys = keys[6:]
        x = format_input_rounds(plain_text[i*16:(i+1)*16])
        for i in range(4):
            x = round(x, k)
            k = keys[:6]
            keys = keys[6:]
            if(len(keys)):
                keys=(generate_keys(key))

        cipher_text += half_round(x, k)


    return cipher_text 


def decrypt(cipher_text, keys, key):
    # print('-----------decrypt-------------')
    # print(keys)
    keys = generate_u_keys(keys)
    # print('uuuuuuuuuuuuuuuuuuuuuuuuuuuuu_keys')
    # print(keys)

    k = keys[:6]
    keys = keys[6:]
    x = format_input_rounds(cipher_text)
    # print('x')
    # print(x)
    for i in range(4):
        x = round(x, k)
        k = keys[:6]
        keys = keys[6:]

    plain_text = half_round(x, k)
    return plain_text



# index=0
# for i in generate_keys(key):
#     print(str(index)+' - k'+ str((index)%6+1)+': '+str(i))
#     index+=1


# key = 11011100011011110011111101011001
# plain_text = 'aaa'
# # plain_text = 1001110010101100
# keys = generate_keys(key)

# result = encrypt(plain_text, keys)

# print("result - cipher_text")
# print(result)

# result = decrypt(result, keys)

# print("result - plain_text")
# print(result)

# print("plain_text")
# print(plain_text)

def main():
    print('Message: ', end='')
    M = input()

    print('DES Key (Binary or Hexadecimal): ', end='')
    K = input()
    keys = generate_keys(K)

    print('Decrypt? [Y/n]: ', end='')
    choice = input()

    if choice.lower() == 'y':
        C = decrypt(M, keys, K)
        print('Decrypted Message:', C)
    else:
        C = encrypt(M, keys, K)
        print('Encrypted Message:', C)


main()