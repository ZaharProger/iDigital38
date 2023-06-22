import React from "react"

export default function Logo(){
    return(
        <div style={{ display: "flex", fontWeight: "bold", alignItems: "baseline" }}>
            <span className="purple-letter" style={{ fontSize: 50, marginBottom: "-10px" }}>i</span>
            <span style={{ fontSize: 50, fontFamily: "hisqaida_2018bold", marginBottom: "-10px" }}>D</span>
            <span style={{ fontSize: 40, fontFamily: "hisqaida_2018bold" }}>igital</span>
            <span className="purple-letter" style={{ fontSize: 50, marginBottom: "-10px",fontFamily: "hisqaida_2018bold"}}>38</span>
        </div>
    )
}