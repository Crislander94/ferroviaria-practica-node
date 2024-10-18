const categoriasPermitidas = (categoria = '',categoriasPermitidas = []) => {
    const incluida = categoriasPermitidas.includes(categoria);
    if(!incluida){
        throw new Error(` La categoria ${categoria}  no es permitida - ${categoriasPermitidas}`);
    }
    return true;
}

module.exports = {
    categoriasPermitidas
}