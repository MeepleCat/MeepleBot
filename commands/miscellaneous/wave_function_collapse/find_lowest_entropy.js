export const find_lowest_entropy = (cells) => {
    let lowest_entropy = 999;
    let lowest_cell = [999, 999];
    for(var a = 0; a < 5; a++) {
        for(var b = 0; b < 5; b++) {
            const cell_length = cells[a][b].length;

            if(cell_length < lowest_entropy && cell_length !== 1) {
                lowest_entropy = cell_length;
                lowest_cell = [a, b];
            }
        }
    }
    
    return lowest_cell;
}