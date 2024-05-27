interface ComBaseConf {
    x?: integer
    y?: integer
    w?: integer
    h?: integer
}

interface ComConf extends ComBaseConf {
    text?: string
    color?: string
    backgroundColor?: string
}

interface ComStruct {
    type: string
    conf: ComConf
}
