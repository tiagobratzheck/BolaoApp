
export const calcularTabelaApostas = (aposta, brasileirao) => {
   
    let pontos = 0;

    // verificar se acertou o campeão >>
    if (aposta['1°'] === brasileirao[0]) {
        pontos += 30;
    } else if (aposta['1°'] === brasileirao[1]
        || aposta['1°'] === brasileirao[2]
        || aposta['1°'] === brasileirao[3]
        || aposta['1°'] === brasileirao[4]
        || aposta['1°'] === brasileirao[5]) {
        pontos += 15;
    } else if (aposta['1°'] === brasileirao[16]
        || aposta['1°'] === brasileirao[17]
        || aposta['1°'] === brasileirao[18]) {
        pontos += 10;
    } else if (aposta['1°'] === brasileirao[19]) {
        pontos -= 20;
    }

    // verificar se acertou o vice-campeão >>
    if (aposta['2°'] === brasileirao[1]) {
        pontos += 20;
    } else if (aposta['2°'] === brasileirao[0]
        || aposta['2°'] === brasileirao[2]
        || aposta['2°'] === brasileirao[3]
        || aposta['2°'] === brasileirao[4]
        || aposta['2°'] === brasileirao[5]) {
        pontos += 15;
    } else if (aposta['2°'] === brasileirao[16]
        || aposta['2°'] === brasileirao[17]
        || aposta['2°'] === brasileirao[18]
        || aposta['2°'] === brasileirao[19]) {
        pontos += 10;
    }

    // verificar se acertou o terceiro lugar >>
    if (aposta['3°'] === brasileirao[2]) {
        pontos += 20;
    } else if (aposta['3°'] === brasileirao[0]
        || aposta['3°'] === brasileirao[1]
        || aposta['3°'] === brasileirao[3]
        || aposta['3°'] === brasileirao[4]
        || aposta['3°'] === brasileirao[5]) {
        pontos += 15;
    } else if (aposta['3°'] === brasileirao[16]
        || aposta['3°'] === brasileirao[17]
        || aposta['3°'] === brasileirao[18]
        || aposta['3°'] === brasileirao[19]) {
        pontos += 10;
    }

    // verificar se acertou o quarto lugar >>
    if (aposta['4°'] === brasileirao[3]) {
        pontos += 20;
    } else if (aposta['4°'] === brasileirao[0]
        || aposta['4°'] === brasileirao[1]
        || aposta['4°'] === brasileirao[2]
        || aposta['4°'] === brasileirao[4]
        || aposta['4°'] === brasileirao[5]) {
        pontos += 15;
    } else if (aposta['4°'] === brasileirao[16]
        || aposta['4°'] === brasileirao[17]
        || aposta['4°'] === brasileirao[18]
        || aposta['4°'] === brasileirao[19]) {
        pontos += 10;
    }

    // verificar se acertou o quinto lugar >>
    if (aposta['5°'] === brasileirao[4]) {
        pontos += 20;
    } else if (aposta['5°'] === brasileirao[0]
        || aposta['5°'] === brasileirao[1]
        || aposta['5°'] === brasileirao[2]
        || aposta['5°'] === brasileirao[3]
        || aposta['5°'] === brasileirao[5]) {
        pontos += 15;
    } else if (aposta['5°'] === brasileirao[16]
        || aposta['5°'] === brasileirao[17]
        || aposta['5°'] === brasileirao[18]
        || aposta['5°'] === brasileirao[19]) {
        pontos += 10;
    }

    // verificar se acertou o sexto lugar >>
    if (aposta['6°'] === brasileirao[5]) {
        pontos += 20;
    } else if (aposta['6°'] === brasileirao[0]
        || aposta['6°'] === brasileirao[1]
        || aposta['6°'] === brasileirao[2]
        || aposta['6°'] === brasileirao[3]
        || aposta['6°'] === brasileirao[4]) {
        pontos += 15;
    } else if (aposta['6°'] === brasileirao[16]
        || aposta['6°'] === brasileirao[17]
        || aposta['6°'] === brasileirao[18]
        || aposta['6°'] === brasileirao[19]) {
        pontos += 10;
    }

    // verificar se acertou o décimo sétimo lugar >>
    if (aposta['17°'] === brasileirao[16]) {
        pontos += 15;
    } else if (aposta['17°'] === brasileirao[17]      
        || aposta['17°'] === brasileirao[18]      
        || aposta['17°'] === brasileirao[19]) {
        pontos += 10;
    } 

    // verificar se acertou o décimo oitavo lugar >>
    if (aposta['18°'] === brasileirao[17]) {
        pontos += 15;
    } else if (aposta['18°'] === brasileirao[16]
        || aposta['18°'] === brasileirao[18]
        || aposta['18°'] === brasileirao[19]) {
        pontos += 10;
    } 

    // verificar se acertou o décimo nono lugar >>
    if (aposta['19°'] === brasileirao[18]) {
        pontos += 15;
    } else if (aposta['19°'] === brasileirao[16]
        || aposta['19°'] === brasileirao[17]
        || aposta['19°'] === brasileirao[19]) {
        pontos += 10;
    } 

    // verificar se acertou o lanterna >>
    if (aposta['20°'] === brasileirao[19]) {
        pontos += 25;
    } else if (aposta['20°'] === brasileirao[16]
        || aposta['20°'] === brasileirao[17]
        || aposta['20°'] === brasileirao[18]) {
        pontos += 10;
    } 

    return pontos

}