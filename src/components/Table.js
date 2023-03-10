import '../style/Table.css'

const fs = require('fs');
const rawData = fs.readFileSync('../../data/Products.json');
const data = JSON.parse(rawData); 

function Table(){
    return (
        <div className='tableContainer'>
            <h1>Title Product</h1>
            <table>
                    <tr id='keyBox'>
                        <th id='keyBox'>Date</th>
                        <th id='keyBox'>Price</th>
                    </tr>
                    {data[0].map((line,index) => (
                        <tr>
                            <td>{line.price}</td>
                            <td>{line.timestamp}</td>
                        </tr>
                    ))}
                    
                    <tr>
                        <td>aaahhhh</td>
                        <td>bbbbbbbb</td>
                    </tr>
                    <tr>
                        <td>aaahhhh</td>
                        <td>bbbbbbbb</td>
                    </tr>
            </table>
        </div>
    );
}

export default Table;