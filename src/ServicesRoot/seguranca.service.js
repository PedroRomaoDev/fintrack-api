import bcrypt from 'bcrypt';

async function gerarHashSenha(senha) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(senha, saltRounds);
    return hash;
}

async function compararSenhas(senhaDigitada, hashArmazenado) {
    const match = await bcrypt.compare(senhaDigitada, hashArmazenado);
    return match;

    // // Exemplo de uso
    // const senhaDigitada = 'minhaSenha123';
    // const senhaEncriptada = 'uwgfwyebfiwbefiuwhbeiufbwiuebfuibweiufbwiuf';

    // compararSenhas(senhaDigitada, senhaEncriptada).then(match => {
    //   if (match) {
    //     console.log('Senha correta! Login autorizado.');
    //   } else {
    //     console.log('Senha incorreta!');
    //   }
    // });
}

export default { gerarHashSenha, compararSenhas };
