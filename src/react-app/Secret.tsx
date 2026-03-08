import { useState } from "react";

export default function Secret() {

const [date,setDate] = useState("");
const [access,setAccess] = useState(false);

// 👇 FECHA SECRETA
const secretDate = "2022-05-31";

function checkPassword(){
if(date === secretDate){
setAccess(true);
}else{
alert("Fecha incorrecta");
}
}

if(access){
return(
<div style={{
backgroundColor:"#ffd6e7",
minHeight:"100vh",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
textAlign:"center"
}}>
<h1>🔓 Bienvenido al área secreta</h1>
<p>Aquí puedes poner juegos ocultos o contenido secreto.</p>
</div>
)
}

return(
<div style={{
backgroundColor:"#ffd6e7",
minHeight:"100vh",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
textAlign:"center"
}}>

<h2>🔒 Área Secreta</h2>
<p>Selecciona la fecha correcta</p>

<input
type="date"
value={date}
onChange={(e)=>setDate(e.target.value)}
style={{padding:"10px",marginTop:"10px"}}
/>

<br/>

<button 
onClick={checkPassword} 
style={{
marginTop:"15px",
backgroundColor:"#c084fc",
color:"white",
padding:"10px 20px",
border:"none",
borderRadius:"8px",
cursor:"pointer"
}}
>
Entrar
</button>

</div>
)
}
