
export default function filterTable(tbody, filters) {
    let rowQuantity = 0;
    function filterColumns(elem) {
        const key = `${elem.dataset.fieldName}`;
        if ((key && elem.textContent.includes(filters[key])) || (filters[key] === undefined)) {
            return true;
        }
        return false;
    }
    for (const row of tbody.children) {
        if (!([...row.children].filter((x, index) => index > 0).every(filterColumns))) {
            row.classList.add("d-none");
        } else {
            // row.classList.remove("d-none");
            rowQuantity++;
            row.children[0].textContent = `${rowQuantity}`;
            row.className = (rowQuantity % 2 === 0) ? "table-row-even" : "table-row-odd";
        }
    }
}
