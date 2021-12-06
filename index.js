const citas = [
    {
        empieza: 8,
        finaliza: 9
    },
    {
        empieza: 11,
        finaliza: 12
    },
] 

const horarios = [
    {
        empieza: 8,
        finaliza: 9
    },
    {
        empieza: 9,
        finaliza: 10
    },
    {
        empieza: 10,
        finaliza: 11
    },
    {
        empieza: 11,
        finaliza: 12
    },
]

const verificarHorario = (horario, citass) => {
    for (let c of citass) {
        if (c.empieza === horario.empieza) {
            return false
        }
    }
    return true    
}

const result = horarios.filter(h => verificarHorario(h, citas))

console.log(result)