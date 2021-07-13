# int to str binary formated
def format_binary(b):
    n = format(int(b), 'b')
    n = '0'*(4 - len(n)) + n
    return n


def format_byte(b):
    n = format(b, 'b')
    for i in range(8 - len(n)):
        n = '0' + n
    return n


def bin2text(s):
    return "".join([chr(int(s[i:i+8], 2)) for i in range(0, len(s), 8)])


def add_mod(n1, n2):
    return (n1 + n2) % 16


def format_plain_text(text):
    a_byte_array = bytearray(text, "utf8")

    text_formated = ''

    text_formated += ''.join(format_byte(int(format(ord(x), 'b'), 2))
                             for x in text)

    space_c = int((len(text_formated) % 16)/8)
    text_formated += format_byte(160) * space_c

    return text_formated


def mul_mod(n1, n2):
    if n1 == 0:
        n1 = 16
    if n2 == 0:
        n2 = 16

    mult = (n1 * n2) % 17

    if (mult == 16):
        mult = 0
    return mult


def add_inv(n):
    return -n


def egcd(a, b):
    if a == 0:
        return (b, 0, 1)
    else:
        g, y, x = egcd(b % a, a)
        return (g, x - (b // a) * y, y)


def modinv(a, m):
    g, x, y = egcd(a, m)
    if g != 1:
        raise Exception('modular inverse does not exist')
    else:
        return x % m


def mul_inv(n):
    mod = 64
    if(n == 0):
        return 0
    inverted = modinv(n, 17)
    return (inverted)


def xor(n1, n2):
    return (int(n1) ^ int(n2))


def rotate(key):
    return key[6:] + key[:6]


def generate_u_keys(keys):
    u = []

    for i in range(10):
        u += keys[len(keys)-4:]
        teste = u[i*6]
        u[(i)*6] = mul_inv(u[(i)*6])

        if(mul_mod(u[(i*6) + 0], teste) != 1):
            print('teste inv mul fail')

        teste = u[(i*6)+1]
        u[(i*6)+1] = add_inv(u[(i*6)+1])

        if(add_mod(u[(i*6) + 1], teste) != 0):
            print('teste inv add fail')

        teste = u[(i*6)+2]
        u[(i*6)+2] = add_inv(u[(i*6)+2])

        if(add_mod(u[(i*6) + 2], teste) != 0):
            print('teste inv add fail')

        teste = u[(i*6)+3]
        u[(i*6)+3] = mul_inv(u[(i*6)+3])

        if(mul_mod(u[(i*6) + 3], teste) != 1):
            print('teste inv mul fail')

        if(len(keys) > 4):
            u.append(keys[len(keys)-6])
            u.append(keys[len(keys)-5])
            keys = keys[:len(keys)-6]
        else:
            break
    return u


def generate_keys(key):
    key = str(key)
    rotate_keys = [key]
    for i in range(6):
        rotate_keys.append(rotate(rotate_keys[i]))

    rt_keys = ''
    for i in range(7):
        rt_keys += rotate_keys[i]

    keys = []
    for i in range(52):
        key_binary = int(rt_keys[(i*4):((i+1)*4)], 2)
        keys.append(key_binary)

    return keys


def format_input_rounds(plain_text):
    ''.join(format(ord(x), 'b') for x in plain_text)
    plain_text = str(plain_text)
    x = []
    for i in range(4):
        x.append(int(plain_text[(i*4):((i+1)*4)], 2))

    return x


def half_round(x, keys):

    p1 = mul_mod(x[0], keys[0])
    p2 = add_mod(x[2], keys[1])
    p3 = add_mod(x[1], keys[2])
    p4 = mul_mod(x[3], keys[3])


    return format_binary(p1) + format_binary(p2) + format_binary(p3) + format_binary(p4)


def round(x, keys):

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

    return [p11, p13, p12, p14]


def encrypt(plain_text, keys, key):
    cipher_text = ''
    plain_text = format_plain_text(plain_text)

    for i in range(int(len(plain_text)/16)):
        k = keys[:6]
        keys = keys[6:]
        x = format_input_rounds(plain_text[i*16:(i+1)*16])
        for i in range(8):
            x = round(x, k)
            k = keys[:6]
            keys = keys[6:]

        cipher_text += half_round(x, k)

        if(len(keys) == 0):
            keys = (generate_keys(key))

    return cipher_text


def decrypt(cipher_text, keys, key):

    plain_text = ''
    keys = generate_u_keys(keys)

    for i in range(int(len(cipher_text)/16)):
        k = keys[:6]
        keys = keys[6:]
        x = format_input_rounds(cipher_text[i*16:(i+1)*16])

        for i in range(8):
            x = round(x, k)
            k = keys[:6]
            keys = keys[6:]


        plain_text += half_round(x, k)
        if(len(keys) == 0):
            keys = (generate_u_keys(generate_keys(key)))

    print('plain_text b')
    print(plain_text)
    plain_text = bin2text(plain_text)
    return plain_text


# key = 1101110001101111001111110101100111011100011011110011111101011001
# plain_text = 'aa'
# plain_text = 1001110010101100
# keys = generate_keys(key)

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
