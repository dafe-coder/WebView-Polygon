export function shuffle(array) {
    const newArr = array.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)) // случайный индекс от 0 до i

        ;[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
    }
    return newArr
}
