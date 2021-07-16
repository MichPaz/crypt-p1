NUM_ROUNDS = 8

def format_key(literal_key):
    literal_key = str(literal_key)
    key = []
    for c in literal_key:
        key.append(int(c, 16))
    return key

def _plaintext_to_blocks(plaintext, cipher):
    blocks = []
    if (not cipher): plaintext += ' ' * (4 - len(plaintext) % 4)
    for char in plaintext:
        b = format(ord(char), 'b')
        b = '0'*(8-len(b)) + b
        if(cipher):
            x = int(b, 2)
            blocks.append(x)
        else:
            x1 = int(b[:4], 2)
            x2 = int(b[4:], 2)
            blocks.append(x1)
            blocks.append(x2)

    return blocks

def _blocks_to_plaintext(blocks, decipher):

    len_word = 4
    if(decipher): len_word = 8

    aux = ''
    for block in blocks:
        b = format(block, 'b')
        b = '0'*(len_word-len(b)) + b
        aux += b

    plain_text = ''

    for i in range(len(aux)//8):
        block = aux[i*8: (i+1)*8]
        block = chr(int(block, 2))
        plain_text += block
    return plain_text

def add_mod(x, y):
	assert 0 <= x <= 0xFFFF
	assert 0 <= y <= 0xFFFF
	return (x + y) & 0xFFFF


def mul_mod(x, y):
	assert 0 <= x <= 0xFFFF
	assert 0 <= y <= 0xFFFF
	if x == 0x0000:
		x = 0x10000
	if y == 0x0000:
		y = 0x10000
	z = (x * y) % 0x10001
	if z == 0x10000:
		z = 0x0000
	assert 0 <= z <= 0xFFFF
	return z


def add_inv(x):
	assert 0 <= x <= 0xFFFF
	return (-x) & 0xFFFF


def modinv(x):
	assert 0 <= x <= 0xFFFF
	if x == 0:
		return 0
	else:
		return pow(x, 0xFFFF, 0x10001)

def generate_keys(key):
	bigkey = 0
	for b in key:
		assert 0 <= b <= 0xFF
		bigkey = (bigkey << 8) | b
	assert 0 <= bigkey < (1 << 128)
	
	bigkey = (bigkey << 16) | (bigkey >> 112)
	
	result = []
	for i in range(NUM_ROUNDS * 6 + 4):
		offset = (i * 16 + i // 8 * 25) % 128
		result.append((bigkey >> (128 - offset)) & 0xFFFF)
	return tuple(result)


def generate_u_keys(keysch):
	assert isinstance(keysch, tuple) and len(keysch) % 6 == 4
	result = []
	result.append(modinv(keysch[-4]))
	result.append(add_inv(keysch[-3]))
	result.append(add_inv(keysch[-2]))
	result.append(modinv(keysch[-1]))
	result.append(keysch[-6])
	result.append(keysch[-5])
	
	for i in range(1, NUM_ROUNDS):
		j = i * 6
		result.append(modinv(keysch[-j - 4]))
		result.append(add_inv(keysch[-j - 2]))
		result.append(add_inv(keysch[-j - 3]))
		result.append(modinv(keysch[-j - 1]))
		result.append(keysch[-j - 6])
		result.append(keysch[-j - 5])
	
	result.append(modinv(keysch[0]))
	result.append(add_inv(keysch[1]))
	result.append(add_inv(keysch[2]))
	result.append(modinv(keysch[3]))
	return tuple(result)

def encrypt(text, key):
    block = _plaintext_to_blocks(text, False)
    result = []
    for i in range((len(block)//8)):
        result += _crypt(block[i*8: (i+1)*8], key, "encrypt")

    result = _blocks_to_plaintext(result, True)
    return result


def decrypt(block, key):
    block = _plaintext_to_blocks(block, True)

    result = []
    for i in range((len(block)//8)):
        j=i*8
        result += _crypt(block[i*8: (i+1)*8], key, "decrypt")

    result = _blocks_to_plaintext(result, False)
    return result


def _crypt(block, key, direction):
	assert isinstance(block, list) and len(block) == 8
	assert isinstance(key, list) and len(key) == 16
	assert direction in ("encrypt", "decrypt")
	
	keyschedule = generate_keys(key)
	if direction == "decrypt":
		keyschedule = generate_u_keys(keyschedule)
	
	w = block[0] << 8 | block[1]
	x = block[2] << 8 | block[3]
	y = block[4] << 8 | block[5]
	z = block[6] << 8 | block[7]
	
	for i in range(NUM_ROUNDS):
		j = i * 6
		w = mul_mod(w, keyschedule[j + 0])
		x = add_mod(x, keyschedule[j + 1])
		y = add_mod(y, keyschedule[j + 2])
		z = mul_mod(z, keyschedule[j + 3])
		u = mul_mod(w ^ y, keyschedule[j + 4])
		v = mul_mod(add_mod(x ^ z, u), keyschedule[j + 5])
		u = add_mod(u, v)
		w ^= v
		x ^= u
		y ^= v
		z ^= u
		x, y = y, x
	
	x, y = y, x
	w = mul_mod(w, keyschedule[-4])
	x = add_mod(x, keyschedule[-3])
	y = add_mod(y, keyschedule[-2])
	z = mul_mod(z, keyschedule[-1])
	
	return [
		w >> 8, w & 0xFF,
		x >> 8, x & 0xFF,
		y >> 8, y & 0xFF,
		z >> 8, z & 0xFF]



def main():
    print('Message: ', end='')
    M = input()

    print('DES Key (Binary or Hexadecimal): ', end='')
    K = input()
    keys = format_key(K)

    print('Decrypt? [Y/n]: ', end='')
    choice = input()

    if choice.lower() == 'y':
        C = decrypt(M, keys)
        print('Decrypted Message:', C)
    else:
        C = encrypt(M, keys)
        print('Encrypted Message:', C)


main()
