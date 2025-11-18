interface User {
    birthYear: number
}

function calculateAgeOfUser ( user: User) {
    return new Date().getFullYear() - user.birthYear;
} 

calculateAgeOfUser({
    birthYear
})

//Isso eh pq o javascript eh fracamente tipado, ou seja, ele nao obriga a gente a passar o tipo certo de dado para a funcao.
//Runtime type checking: ou seja, a verificacao de tipos acontece em tempo de execucao, e nao em tempo de compilacao.