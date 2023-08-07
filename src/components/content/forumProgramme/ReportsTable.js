import React from "react"
import {v4 as uuidV4} from "uuid"

import {HEADERS} from "../../../globalConstants"
import {prepareTime} from "../../../utils"

export default function ReportsTable(props) {
    const { headers, items } = props.table_props

    return (
        <table className="Reports-table table mt-3 me-auto ms-auto">
            <thead>
            {
                headers.map(header => {
                    const tableHeaderKey = `table_header_${header}${uuidV4()}`
                    return <th key={ tableHeaderKey } scope="col"
                               className="table-header-text text-center">{ header }</th>
                })
            }
            </thead>
            <tbody>
            {
                items.sort((first, second) => first.time_start - second.time_start).map((item, index) => {
                    const tableRowKey = `table_row_${index}_${uuidV4()}`
                    const tableMainItemClass = 'table-main-data-text text-center align-middle'
                    const tableItemClass = 'table-data-text text-center align-middle'

                    return <tr key={ tableRowKey }>
                        {
                            headers.includes(HEADERS.number)?
                                <th className={ tableMainItemClass }
                                    scope="row">{ index + 1 }</th>
                                :
                                null
                        }
                        <td className={ tableItemClass }>{ item.name }</td>
                        <td className={ tableItemClass }>{ prepareTime(item.time_start) }</td>
                        <td className={ tableItemClass }>{ item.speakers !== null? item.speakers : '' }</td>
                    </tr>
                })
            }
            </tbody>
        </table>
    )
}