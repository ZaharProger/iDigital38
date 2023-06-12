import React from "react"

export default function ReportsTable(props) {
    const { headers, items } = props.table_props

    return (
        <table className="Reports-table table mt-3 me-auto ms-auto">
            <thead>
            {
                headers.map(header => {
                    const tableHeaderKey = `table_header_${header}${Math.random() * 10000}`
                    return <th key={ tableHeaderKey } scope="col"
                               className="table-header-text text-center">{ header }</th>
                })
            }
            </thead>
            <tbody>
            {
                items.map(item => {
                    const itemIndex = items.indexOf(item)

                    const tableRowKey = `table_row_${items.indexOf(item)}_${item.id}`
                    const tableMainItemClass = 'table-main-data-text text-center align-middle'
                    const tableItemClass = 'table-data-text text-center align-middle'

                    const speakers = item.speakers
                        .map(speaker => {
                            return `${speaker.name} - ${speaker.role}`
                        })
                        .join('\n')

                    return <tr key={ tableRowKey }>
                        <th className={ tableMainItemClass }
                            scope="row">{ itemIndex + 1 }</th>
                        <td className={ tableItemClass }>{ item.name }</td>
                        <td className={ tableItemClass }>{ item.time }</td>
                        <td className={ tableItemClass }>{ speakers }</td>
                    </tr>
                })
            }
            </tbody>
        </table>
    )
}