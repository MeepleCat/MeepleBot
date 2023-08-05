import { find_lowest_entropy } from "./find_lowest_entropy.js";

export const wave_function_collapse = () => {
    let cells = [
        [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]],
        [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]],
        [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]],
        [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]],
        [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]]
    ];
    
    for(var r = 0; r < 5; r++) {
        for(var c = 0; c < 5; c++) {
            const lowest_cell = find_lowest_entropy(cells);
            const cell_entropy = cells[r][c];

            const collapsed_into = Math.floor(Math.random() * cell_entropy.length);
            
            console.log(lowest_cell);
            console.log(collapsed_into);

            cells[lowest_cell[0]][lowest_cell[1]] = [collapsed_into];
        }
    }   

    console.log(cells);
}