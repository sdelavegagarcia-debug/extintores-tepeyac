import { useState, useRef, useEffect } from "react";

const RED = "#c0392b";
const DARK = "#1a1a2e";
const WA = "524773796786";
const EIMG = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Fire_extinguisher_on_white_background.jpg/800px-Fire_extinguisher_on_white_background.jpg";
const SIMG = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80";
const AIMG = "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80";
const r5 = p => Math.ceil(p * 1.05 / 5) * 5;

const PRODS = [
  { id:"e1", cat:"Extintores", name:"Extintor PQS ABC 1 kg", price:r5(576), img:EIMG, ficha:{ capacidad:"1 kg", agente:"Polvo Químico Seco ABC", presión:"1.7 MPa", alcance:"2-3 m", norma:"NOM-100-STPS-1994", fuegos:"Clase A, B, C" }, desc:"Compacto, ideal para automóviles, motos y espacios reducidos." },
  { id:"e2", cat:"Extintores", name:"Extintor PQS ABC 2 kg", price:r5(672), img:EIMG, ficha:{ capacidad:"2 kg", agente:"Polvo Químico Seco ABC", presión:"1.7 MPa", alcance:"2-3 m", norma:"NOM-100-STPS-1994", fuegos:"Clase A, B, C" }, desc:"Para oficinas pequeñas, locales y uso doméstico." },
  { id:"e3", cat:"Extintores", name:"Extintor PQS ABC 4.5 kg", price:r5(922), img:EIMG, ficha:{ codigo:"C005F01", capacidad:"4.5 kg", agente:"PQS ABC 75% fosfato monoamónico", presión:"1.7 MPa", manguera:"1/2 x 40 cm", altura:"47 cm", diámetro:"15.3 cm", peso:"7.9 kg", alcance:"3 m", descarga:"8-25 s", norma:"NOM-100-STPS-1994", fuegos:"Clase A, B, C" }, desc:"Ideal para locales comerciales y oficinas. Pintura horneada electrostática." },
  { id:"e4", cat:"Extintores", name:"Extintor PQS ABC 6 kg", price:r5(1016), img:EIMG, ficha:{ codigo:"C007F01", capacidad:"6 kg", agente:"PQS ABC 75% fosfato monoamónico", presión:"1.7 MPa", manguera:"1/2 x 50 cm", altura:"56.5 cm", diámetro:"15.3 cm", peso:"10.4 kg", alcance:"3 m", descarga:"8-25 s", norma:"NOM-100-STPS-1994", fuegos:"Clase A, B, C" }, desc:"Para restaurantes, almacenes y talleres." },
  { id:"e5", cat:"Extintores", name:"Extintor PQS ABC 9 kg", price:r5(1224), img:EIMG, ficha:{ codigo:"C008F01", capacidad:"9 kg", agente:"PQS ABC 75% fosfato monoamónico", presión:"1.7 MPa", manguera:"1/2 x 50 cm", altura:"57.5 cm", diámetro:"17.8 cm", peso:"13.9 kg", alcance:"3 m", descarga:"8-25 s", norma:"NOM-100-STPS-1994", fuegos:"Clase A, B, C" }, desc:"Uso industrial. Recomendado para bodegas y fábricas." },
  { id:"e6", cat:"Extintores", name:"Extintor CO2 4.5 kg", price:Math.ceil(258*1.05), priceUSD:true, img:EIMG, ficha:{ capacidad:"4.5 kg", agente:"Dióxido de Carbono CO2", presión:"850 psi", alcance:"1-2.5 m", norma:"NOM-154-SCFI", fuegos:"Clase B, C", nota:"Sin residuos" }, desc:"Para cuartos eléctricos, servidores y laboratorios. No deja residuos." },
  { id:"s1", cat:"Señalética", name:"Señal Extintor 25x25 cm Fotoluminiscente", price:r5(60), img:SIMG, ficha:{ material:"PVC fotoluminiscente", medidas:"25x25 cm", norma:"NOM-003-SEGOB", instalación:"Adhesivo trasero incluido", luminiscencia:"6-8 horas", vida_útil:"10 años" }, desc:"Visible en oscuridad. Obligatoria por NOM-002." },
  { id:"s2", cat:"Señalética", name:"Señal Extintor 25x25 cm Estándar", price:r5(30), img:SIMG, ficha:{ material:"PVC rígido", medidas:"25x25 cm", norma:"NOM-003-SEGOB", instalación:"Adhesivo trasero incluido", vida_útil:"5 años" }, desc:"Versión estándar sin fotoluminiscente." },
  { id:"s3", cat:"Señalética", name:"Señal Hidrante 30x40 cm Fotoluminiscente", price:r5(120), img:SIMG, ficha:{ material:"PVC fotoluminiscente", medidas:"30x40 cm", norma:"NOM-003-SEGOB", instalación:"Adhesivo trasero incluido", luminiscencia:"6-8 horas", vida_útil:"10 años" }, desc:"Señalamiento de hidrante fotoluminiscente." },
  { id:"s4", cat:"Señalética", name:"Señal Hidrante 30x40 cm Estándar", price:r5(50), img:SIMG, ficha:{ material:"PVC rígido", medidas:"30x40 cm", norma:"NOM-003-SEGOB", instalación:"Adhesivo trasero incluido", vida_útil:"5 años" }, desc:"Señalamiento de hidrante estándar." },
  { id:"s5", cat:"Señalética", name:"Señal Ruta Evacuación 20x40 cm Fotoluminiscente", price:r5(75), img:SIMG, ficha:{ material:"PVC fotoluminiscente", medidas:"20x40 cm", norma:"NOM-003-SEGOB", instalación:"Adhesivo trasero incluido", luminiscencia:"6-8 horas", vida_útil:"10 años" }, desc:"Con flecha direccional. Requerida en rutas de evacuación." },
  { id:"s6", cat:"Señalética", name:"Señal Ruta Evacuación 20x40 cm Estándar", price:r5(30), img:SIMG, ficha:{ material:"PVC rígido", medidas:"20x40 cm", norma:"NOM-003-SEGOB", instalación:"Adhesivo trasero incluido", vida_útil:"5 años" }, desc:"Ruta de evacuación versión estándar." },
  { id:"s7", cat:"Señalética", name:"Señal Salida de Emergencia 20x40 cm Fotoluminiscente", price:r5(75), img:SIMG, ficha:{ material:"PVC fotoluminiscente", medidas:"20x40 cm", norma:"NOM-003-SEGOB", instalación:"Adhesivo trasero incluido", luminiscencia:"6-8 horas", vida_útil:"10 años" }, desc:"Obligatoria en todas las salidas." },
  { id:"s8", cat:"Señalética", name:"Señal Salida de Emergencia 20x40 cm Estándar", price:r5(30), img:SIMG, ficha:{ material:"PVC rígido", medidas:"20x40 cm", norma:"NOM-003-SEGOB", instalación:"Adhesivo trasero incluido", vida_útil:"5 años" }, desc:"Salida de emergencia versión estándar." },
  { id:"s9", cat:"Señalética", name:"Señal Punto de Reunión 40x40 cm Fotoluminiscente", price:r5(190), img:SIMG, ficha:{ material:"PVC fotoluminiscente", medidas:"40x40 cm", norma:"NOM-003-SEGOB", instalación:"Adhesivo trasero incluido", luminiscencia:"6-8 horas", vida_útil:"10 años" }, desc:"Punto de reunión fotoluminiscente de gran formato." },
  { id:"s10", cat:"Señalética", name:"Señal Punto de Reunión 40x40 cm Estándar", price:r5(60), img:SIMG, ficha:{ material:"PVC rígido", medidas:"40x40 cm", norma:"NOM-003-SEGOB", instalación:"Adhesivo trasero incluido", vida_útil:"5 años" }, desc:"Punto de reunión versión estándar." },
  { id:"s11", cat:"Señalética", name:"Señal Qué Hacer en Caso de 34x40 cm Fotoluminiscente", price:r5(140), img:SIMG, ficha:{ material:"PVC fotoluminiscente", medidas:"34x40 cm", norma:"NOM-003-SEGOB", instalación:"Adhesivo trasero incluido", luminiscencia:"6-8 horas", vida_útil:"10 años" }, desc:"Instrucciones de emergencia fotoluminiscente." },
  { id:"s12", cat:"Señalética", name:"Señal Qué Hacer en Caso de 34x40 cm Estándar", price:r5(60), img:SIMG, ficha:{ material:"PVC rígido", medidas:"34x40 cm", norma:"NOM-003-SEGOB", instalación:"Adhesivo trasero incluido", vida_útil:"5 años" }, desc:"Instrucciones de emergencia estándar." },
  { id:"s13", cat:"Señalética", name:"Señal Alarma 25x25 cm Fotoluminiscente", price:r5(60), img:SIMG, ficha:{ material:"PVC fotoluminiscente", medidas:"25x25 cm", norma:"NOM-003-SEGOB", instalación:"Adhesivo trasero incluido", luminiscencia:"6-8 horas", vida_útil:"10 años" }, desc:"Ubicación de alarma fotoluminiscente." },
  { id:"s14", cat:"Señalética", name:"Señal Alarma 25x25 cm Estándar", price:r5(30), img:SIMG, ficha:{ material:"PVC rígido", medidas:"25x25 cm", norma:"NOM-003-SEGOB", instalación:"Adhesivo trasero incluido", vida_útil:"5 años" }, desc:"Ubicación de alarma estándar." },
  { id:"s15", cat:"Señalética", name:"Señal No Fumar 30x40 cm Fotoluminiscente", price:r5(120), img:SIMG, ficha:{ material:"PVC fotoluminiscente", medidas:"30x40 cm", norma:"NOM-003-SEGOB", instalación:"Adhesivo trasero incluido", luminiscencia:"6-8 horas", vida_útil:"10 años" }, desc:"Señal de no fumar fotoluminiscente." },
  { id:"s16", cat:"Señalética", name:"Señal No Fumar 30x40 cm Estándar", price:r5(50), img:SIMG, ficha:{ material:"PVC rígido", medidas:"30x40 cm", norma:"NOM-003-SEGOB", instalación:"Adhesivo trasero incluido", vida_útil:"5 años" }, desc:"Señal de no fumar estándar." },
  { id:"s17", cat:"Señalética", name:"Señal Alto Voltaje 30x40 cm Fotoluminiscente", price:r5(120), img:SIMG, ficha:{ material:"PVC fotoluminiscente", medidas:"30x40 cm", norma:"NOM-003-SEGOB", instalación:"Adhesivo trasero incluido", luminiscencia:"6-8 horas", vida_útil:"10 años" }, desc:"Precaución alto voltaje fotoluminiscente." },
  { id:"s18", cat:"Señalética", name:"Señal Alto Voltaje 30x40 cm Estándar", price:r5(50), img:SIMG, ficha:{ material:"PVC rígido", medidas:"30x40 cm", norma:"NOM-003-SEGOB", instalación:"Adhesivo trasero incluido", vida_útil:"5 años" }, desc:"Precaución alto voltaje estándar." },
  { id:"a1", cat:"Alarmas y Detectores", name:"Detector de Humo BRK SMI100", price:r5(435), img:AIMG, ficha:{ marca:"BRK by Resideo / First Alert", modelo:"SMI100 Cat.1046832", sensor:"Ionización de precisión", alarma:"85 dB a 10 pies", batería:"9V Carbon Zinc incluida", dimensiones:"5.58 pulg diámetro x 1.99 pulg alto", peso:"0.43 lb", temperatura:"4.4 a 37.8°C", certificación:"UL217 / NFPA 72 / NFPA 101", garantía:"10 años limitada" }, desc:"Detector BRK SMI100, ionización precisión, 85dB, UL217. Batería 9V incluida, garantía 10 años." },
  { id:"a2", cat:"Alarmas y Detectores", name:"Sistema de Alarma Completo contra Incendio", price:Math.ceil(r5(4747)*1.10/5)*5, img:AIMG, ficha:{ incluye:"Gabinete + Estación manual + Luz estroboscópica + Sirena + Fuente + Batería", gabinete:"Acero cal.26 beige, 15x16x20 cm, 0.92 kg", estación:"Honeywell 5140MPS aluminio, cert. UL, reseteo con llave", luz:"SECO-LARM SL-126, xenón, +2,000,000 destellos, 6-12VDC", sirena:"30W, 2 tonos, 95dB, 12VCC, ABS blanco 20x12x23 cm", fuente:"Altronix AL624, 12VDC 1.2A con respaldo", batería:"BRISTALL 12V 4.5Ah AGM/VRLA", norma:"UL / NFPA 72 / NOM-002-STPS-2010", instalación:"Requiere técnico capacitado" }, desc:"Sistema completo: gabinete acero, estación Honeywell, luz SECO-LARM, sirena 95dB, fuente Altronix y batería BRISTALL." },
];

const CATS = ["Todos","Extintores","Señalética","Alarmas y Detectores"];

const FAQ = [
  { q:"¿Cada cuánto tiempo debo recargar mi extintor?", a:"La NOM-002-STPS-2010 establece revisión y mantenimiento mínimo anual. Si el extintor fue usado, debe recargarse de inmediato. En León, Gto. ofrecemos recarga a domicilio." },
  { q:"¿Cuántos extintores necesita mi negocio?", a:"Riesgo ordinario: 1 extintor por cada 200 m2, máximo 23 m de recorrido. Riesgo alto: 1 por cada 100 m2, máximo 15 m. Usa nuestra calculadora." },
  { q:"¿Qué tipo de extintor necesito?", a:"El PQS ABC es el más versátil para fuegos A, B y C. El CO2 es ideal para servidores y equipos eléctricos. Para cocinas con aceite se recomienda Clase K." },
  { q:"¿La señalética es obligatoria?", a:"Sí. La NOM-003-SEGOB exige señalética en salidas, rutas de evacuación, ubicación de extintores y punto de reunión en todo centro de trabajo." },
  { q:"¿Ofrecen factura?", a:"Sí, contáctanos por WhatsApp para solicitar factura con tus datos fiscales." },
  { q:"¿Hacen envíos fuera de León?", a:"La señalética la enviamos por paquetería a todo México. Los extintores requieren coordinación especial por volumen y zona." },
  { q:"¿Qué multas aplican por no cumplir la NOM-002?", a:"Multas de 250 a 5,000 UMA (aprox $27,000 a $545,000 MXN en 2024). Además puede afectar tu seguro en caso de siniestro." },
  { q:"¿Ofrecen recarga y mantenimiento a domicilio?", a:"Sí, en León, Gto. Contáctanos por WhatsApp para agendar." },
];

const NOM_SYS = "Eres asesor experto en proteccion contra incendio de Extintores Tepeyac del Bajio, Leon Guanajuato Mexico. Dominas NOM-002-STPS-2010, NOM-100-STPS-1994, NOM-104-STPS-2001, NOM-154-SCFI, NOM-003-SEGOB, NFPA 10, NFPA 72. Riesgo ordinario: 1 extintor/200m2, max 23m. Riesgo alto: 1/100m2, max 15m. Multas 250-5000 UMA. Productos: PQS 1kg $605, 2kg $705, 4.5kg $970, 6kg $1070, 9kg $1285. CO2 4.5kg $271USD. Detector BRK $460. Sistema alarma $5485. Recarga en Leon Gto. Responde en espanol, max 5 parrafos, cierra con WhatsApp 477 379 6786.";

const QuienesSomos = () => {
  const items = [
    { icon:"35+", label:"Años de experiencia", sub:"Trayectoria familiar desde León, Gto." },
    { icon:"NOM", label:"Productos certificados", sub:"NOM-002, NOM-100, NOM-003-SEGOB" },
    { icon:"360", label:"Servicio completo", sub:"Venta, recarga, mantenimiento y asesoría" },
    { icon:"MX",  label:"Cobertura nacional",  sub:"Entrega en León y envíos a todo México" },
  ];
  return (
    <div style={{background:"#fff",borderRadius:12,padding:24,boxShadow:"0 2px 8px rgba(0,0,0,0.07)",marginBottom:20}}>
      <h2 style={{margin:"0 0 20px",fontSize:20,fontWeight:700}}>Quienes Somos</h2>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
        <div>
          <p style={{fontSize:14,color:"#555",lineHeight:1.8,margin:"0 0 14px"}}>Extintores Tepeyac del Bajío es una empresa familiar con más de <strong>35 años de experiencia</strong> en protección contra incendio. Desde León, Guanajuato, hemos servido a miles de clientes en todo el Bajío y a nivel nacional.</p>
          <p style={{fontSize:14,color:"#555",lineHeight:1.8,margin:"0 0 14px"}}>Nos especializamos en venta, recarga y mantenimiento de extintores, señalética, detectores y sistemas de alarma con equipos certificados bajo NOM-002, NOM-100 y NOM-003-SEGOB.</p>
          <p style={{fontSize:14,color:"#555",lineHeight:1.8,margin:"0 0 14px"}}>Atendemos negocios, comercios, industrias, restaurantes, oficinas y hogares con un trato cercano y honesto respaldado por décadas de experiencia familiar.</p>
          <div style={{background:"#fff8e1",border:"1px solid #f9a825",borderRadius:10,padding:14,fontSize:13}}>
            <strong>Dictamen de Cumplimiento No. 3RS 0019 25 18</strong><br/>
            NOM-154 SCFI-2005 — Extintores, Mantenimiento y Recarga<br/>
            Entidad: 3RS Servicios EHS — UVNOM 073<br/>
            <span style={{color:RED,fontWeight:600}}>Vigente: 20 nov 2025 al 20 nov 2026</span>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {items.map((it,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:14,background:"#f9f9f9",borderRadius:10,padding:"14px 16px"}}>
              <div style={{width:48,height:48,borderRadius:10,background:RED,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:13,flexShrink:0}}>{it.icon}</div>
              <div>
                <div style={{fontWeight:700,fontSize:14,color:DARK}}>{it.label}</div>
                <div style={{fontSize:12,color:"#888"}}>{it.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [open, setOpen] = useState(null);
  return (
    <div style={{background:"#fff",borderRadius:12,padding:24,boxShadow:"0 2px 8px rgba(0,0,0,0.07)",marginBottom:20}}>
      <h2 style={{margin:"0 0 20px",fontSize:20,fontWeight:700}}>Preguntas Frecuentes</h2>
      {FAQ.map((item,i)=>(
        <div key={i} style={{borderBottom:"1px solid #f0f0f0"}}>
          <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",textAlign:"left",padding:"14px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:14,fontWeight:600,color:DARK}}>
            {item.q}
            <span style={{fontSize:20,color:RED,flexShrink:0,marginLeft:8}}>{open===i?"−":"+"}</span>
          </button>
          {open===i&&<div style={{fontSize:13,color:"#555",lineHeight:1.7,paddingBottom:14}}>{item.a}</div>}
        </div>
      ))}
    </div>
  );
};

const Calculadora = () => {
  const [area, setArea] = useState("");
  const [riesgo, setRiesgo] = useState("ordinario");
  const [res, setRes] = useState(null);
  const calc = () => {
    const m2 = parseFloat(area);
    if(!m2||m2<=0) return;
    const qty = Math.ceil(m2/(riesgo==="ordinario"?200:100));
    const dist = riesgo==="ordinario"?23:15;
    const kg = riesgo==="ordinario"?"4.5 o 6 kg":"6 o 9 kg";
    setRes({qty,dist,kg,m2});
  };
  return (
    <div style={{background:"#fff",borderRadius:12,padding:24,boxShadow:"0 2px 8px rgba(0,0,0,0.07)",marginBottom:20}}>
      <h2 style={{margin:"0 0 6px",fontSize:20,fontWeight:700}}>Calculadora NOM-002</h2>
      <p style={{fontSize:13,color:"#888",margin:"0 0 20px"}}>Descubre cuantos extintores necesitas segun la normativa mexicana.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
        <div>
          <label style={{fontSize:13,fontWeight:600,color:"#444",marginBottom:4,display:"block"}}>Superficie (m2)</label>
          <input style={{width:"100%",border:"1.5px solid #ddd",borderRadius:6,padding:"9px 12px",fontSize:14,boxSizing:"border-box"}} type="number" min="1" placeholder="Ej. 150" value={area} onChange={e=>setArea(e.target.value)}/>
        </div>
        <div>
          <label style={{fontSize:13,fontWeight:600,color:"#444",marginBottom:4,display:"block"}}>Tipo de riesgo</label>
          <select style={{width:"100%",border:"1.5px solid #ddd",borderRadius:6,padding:"9px 12px",fontSize:14,boxSizing:"border-box"}} value={riesgo} onChange={e=>setRiesgo(e.target.value)}>
            <option value="ordinario">Ordinario - Oficinas, comercios</option>
            <option value="alto">Alto - Bodegas, talleres, cocinas</option>
          </select>
        </div>
      </div>
      <button style={{background:RED,color:"#fff",border:"none",borderRadius:6,padding:"11px 28px",fontSize:14,cursor:"pointer",fontWeight:600}} onClick={calc}>Calcular</button>
      {res&&(
        <div style={{marginTop:20,background:"#fff8e1",border:"1px solid #f9a825",borderRadius:12,padding:20}}>
          <div style={{fontWeight:700,fontSize:15,marginBottom:16}}>Resultado para {res.m2} m2 — Riesgo {res.riesgo||riesgo}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:16}}>
            {[{v:res.qty,l:"Extintores minimos"},{v:res.dist+"m",l:"Distancia max recorrido"},{v:res.kg,l:"Capacidad recomendada"}].map((r,i)=>(
              <div key={i} style={{background:"#fff",borderRadius:8,padding:14,textAlign:"center",boxShadow:"0 2px 6px rgba(0,0,0,0.06)"}}>
                <div style={{fontSize:i===2?18:32,fontWeight:800,color:RED}}>{r.v}</div>
                <div style={{fontSize:12,color:"#555",marginTop:4}}>{r.l}</div>
              </div>
            ))}
          </div>
          <p style={{fontSize:12,color:"#666",margin:"0 0 14px"}}>Guia basada en NOM-002-STPS-2010. Para evaluacion oficial contactanos.</p>
          <button style={{background:"#25d366",color:"#fff",border:"none",borderRadius:6,padding:"10px 20px",fontSize:13,cursor:"pointer",fontWeight:600}}
            onClick={()=>window.open("https://wa.me/"+WA+"?text="+encodeURIComponent("Hola, necesito "+res.qty+" extintor(es) para "+res.m2+"m2 con riesgo "+riesgo+". Me pueden cotizar?"),"_blank")}>
            Cotizar {res.qty} extintor(es) por WhatsApp
          </button>
        </div>
      )}
    </div>
  );
};

const Footer = () => (
  <footer style={{background:DARK,color:"#fff",padding:"40px 24px 24px",marginTop:20}}>
    <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:32}}>
      <div>
        <div style={{fontWeight:800,fontSize:15,marginBottom:10}}>Extintores Tepeyac del Bajio</div>
        <p style={{fontSize:13,color:"rgba(255,255,255,0.7)",lineHeight:1.6,margin:0}}>Empresa familiar con 35 años de experiencia. Venta, recarga y mantenimiento de equipos contra incendio en León, Gto. y todo México.</p>
      </div>
      <div>
        <div style={{fontWeight:700,fontSize:13,marginBottom:10}}>Contacto</div>
        <div style={{display:"flex",flexDirection:"column",gap:8,fontSize:13,color:"rgba(255,255,255,0.7)"}}>
          <a href={"https://wa.me/"+WA} target="_blank" rel="noreferrer" style={{color:"#25d366",textDecoration:"none"}}>WhatsApp: 477 379 6786</a>
          <a href="mailto:extintores_tepeyac@hotmail.com" style={{color:"rgba(255,255,255,0.7)",textDecoration:"none"}}>extintores_tepeyac@hotmail.com</a>
          <span>Leon, Guanajuato, Mexico</span>
        </div>
      </div>
      <div>
        <div style={{fontWeight:700,fontSize:13,marginBottom:10}}>Servicios</div>
        <div style={{display:"flex",flexDirection:"column",gap:6,fontSize:13,color:"rgba(255,255,255,0.7)"}}>
          <span>Venta de extintores</span>
          <span>Recarga y mantenimiento (León, Gto.)</span>
          <span>Señalética contra incendio</span>
          <span>Detectores y alarmas</span>
          <span>Asesoría NOM-002 sin costo</span>
        </div>
      </div>
      <div>
        <div style={{fontWeight:700,fontSize:13,marginBottom:10}}>Normativas</div>
        <div style={{display:"flex",flexDirection:"column",gap:6,fontSize:13,color:"rgba(255,255,255,0.7)"}}>
          <span>NOM-002-STPS-2010</span><span>NOM-100-STPS-1994</span>
          <span>NOM-104-STPS-2001</span><span>NOM-003-SEGOB</span><span>NOM-154-SCFI</span>
        </div>
      </div>
    </div>
    <div style={{maxWidth:1100,margin:"24px auto 0",paddingTop:16,borderTop:"1px solid rgba(255,255,255,0.1)",fontSize:12,color:"rgba(255,255,255,0.4)",textAlign:"center"}}>
      {new Date().getFullYear()} Extintores Tepeyac del Bajio — Leon, Guanajuato — Todos los derechos reservados
    </div>
  </footer>
);

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{role:"assistant",content:"Hola! Soy el asesor de proteccion contra incendio de Extintores Tepeyac del Bajio.\n\nEstoy capacitado en NOM-002, NOM-100, NOM-003-SEGOB y mas.\n\nCuentame:\n- Que tipo de negocio tienes?\n- Cuantos m2 aproximadamente?\n- En que ciudad estas?"}]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const inpRef = useRef(null);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[msgs]);
  useEffect(()=>{if(open)setTimeout(()=>inpRef.current?.focus(),100);},[open]);
  const send = async () => {
    if(!inp.trim()||loading) return;
    const um = {role:"user",content:inp.trim()};
    const hist = [...msgs,um];
    setMsgs(hist); setInp(""); setLoading(true); inpRef.current?.focus();
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:NOM_SYS,messages:hist.map(m=>({role:m.role,content:m.content}))})});
      const d = await r.json();
      setMsgs(h=>[...h,{role:"assistant",content:d.content?.[0]?.text||"Error, intenta de nuevo."}]);
    } catch { setMsgs(h=>[...h,{role:"assistant",content:"Ocurrio un error. Intenta de nuevo."}]); }
    setLoading(false); setTimeout(()=>inpRef.current?.focus(),100);
  };
  return (
    <div style={{position:"fixed",bottom:24,right:24,zIndex:900}}>
      {open&&(
        <div style={{position:"fixed",bottom:96,right:24,width:340,height:500,background:"#fff",borderRadius:16,boxShadow:"0 8px 32px rgba(0,0,0,0.2)",display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{background:"#8b0000",color:"#fff",padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontWeight:700,fontSize:14}}>Asesor Tepeyac</div>
              <div style={{fontSize:11,opacity:0.8}}>Experto en NOM-002, NOM-003, NOM-100</div>
            </div>
            <button style={{background:"none",border:"none",color:"#fff",cursor:"pointer",fontSize:18}} onClick={()=>setOpen(false)}>X</button>
          </div>
          <div style={{flexGrow:1,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:10}}>
            {msgs.map((m,i)=>(
              <div key={i} style={{alignSelf:m.role==="user"?"flex-end":"flex-start",maxWidth:"85%",padding:"10px 14px",borderRadius:m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",background:m.role==="user"?RED:"#f0f0f0",color:m.role==="user"?"#fff":DARK,fontSize:13,lineHeight:1.5,whiteSpace:"pre-wrap"}}>{m.content}</div>
            ))}
            {loading&&<div style={{alignSelf:"flex-start",padding:"10px 14px",background:"#f0f0f0",borderRadius:"16px 16px 16px 4px",fontSize:13,color:"#888"}}>Analizando...</div>}
            <div ref={endRef}/>
          </div>
          <div style={{display:"flex",borderTop:"1px solid #eee",padding:10,gap:8}}>
            <input ref={inpRef} style={{flexGrow:1,border:"1.5px solid #ddd",borderRadius:6,padding:"9px 12px",fontSize:13,boxSizing:"border-box",outline:"none"}} placeholder="Describe tu negocio..." value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}/>
            <button style={{background:RED,color:"#fff",border:"none",borderRadius:6,padding:"8px 12px",cursor:"pointer",fontWeight:600,flexShrink:0}} onClick={send}>Enviar</button>
          </div>
        </div>
      )}
      <button onClick={()=>setOpen(o=>!o)} style={{background:RED,color:"#fff",border:"none",borderRadius:"50%",width:56,height:56,fontSize:26,cursor:"pointer",boxShadow:"0 4px 16px rgba(192,57,43,0.5)",display:"flex",alignItems:"center",justifyContent:"center"}}>
        {open?"X":"💬"}
      </button>
    </div>
  );
};

const WABtn = () => (
  <a href={"https://wa.me/"+WA+"?text="+encodeURIComponent("Hola, me gustaria informacion sobre sus productos.")} target="_blank" rel="noreferrer"
    style={{position:"fixed",bottom:92,right:24,zIndex:899,background:"#25d366",color:"#fff",borderRadius:"50%",width:52,height:52,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(37,211,102,0.5)",textDecoration:"none"}}>
    <svg viewBox="0 0 24 24" width="28" height="28" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>
);

export default function App() {
  const [view, setView] = useState("store");
  const [cat, setCat] = useState("Todos");
  const [list, setList] = useState([]);
  const [form, setForm] = useState({name:"",phone:"",city:"",notes:""});
  const [sel, setSel] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = PRODS.filter(p=>(cat==="Todos"||p.cat===cat)&&(search===""||p.name.toLowerCase().includes(search.toLowerCase())));
  const add = p => { setList(c=>{ const ex=c.find(x=>x.id===p.id); return ex?c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x):[...c,{...p,qty:1}]; }); setSel(null); };
  const upd = (id,d) => setList(c=>c.map(x=>x.id===id?{...x,qty:Math.max(0,x.qty+d)}:x).filter(x=>x.qty>0));
  const total = list.reduce((s,x)=>s+x.qty,0);

  const sendWA = () => {
    let msg = "Solicitud - Extintores Tepeyac del Bajio\n\nNombre: "+form.name+"\nTelefono: "+form.phone+"\nCiudad: "+form.city+"\n";
    if(form.notes) msg += "Notas: "+form.notes+"\n";
    msg += "\nProductos:\n";
    list.forEach(x=>{ msg += "- "+x.name+" x"+x.qty+" $"+(x.priceUSD?x.price:(x.price*x.qty).toLocaleString("es-MX"))+" "+(x.priceUSD?"USD":"MXN")+"\n"; });
    window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(msg),"_blank");
    setList([]); setForm({name:"",phone:"",city:"",notes:""}); setView("store");
  };

  const st = {
    app:{fontFamily:"'Segoe UI',sans-serif",minHeight:"100vh",background:"#f4f6f9",color:DARK},
    nav:{background:"#8b0000",padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:64,boxShadow:"0 3px 12px rgba(0,0,0,0.25)"},
    btn:(bg,fg)=>({background:bg||RED,color:fg||"#fff",border:"none",borderRadius:6,padding:"8px 16px",cursor:"pointer",fontWeight:600,fontSize:13}),
    wrap:{maxWidth:1100,margin:"0 auto",padding:"24px 16px"},
    catBtn:a=>({padding:"7px 16px",borderRadius:20,border:"2px solid "+RED,background:a?RED:"#fff",color:a?"#fff":RED,cursor:"pointer",fontWeight:600,fontSize:13}),
    grid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:20},
    inp:{width:"100%",border:"1.5px solid #ddd",borderRadius:6,padding:"9px 12px",fontSize:14,boxSizing:"border-box"},
    lbl:{fontSize:13,fontWeight:600,color:"#444",marginBottom:4,display:"block"},
    sec:{background:"#fff",borderRadius:12,padding:24,boxShadow:"0 2px 8px rgba(0,0,0,0.07)",marginBottom:20},
    ovl:{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16},
    mod:{background:"#fff",borderRadius:16,maxWidth:660,width:"100%",maxHeight:"90vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"},
  };

  const Navbar = () => (
    <nav style={st.nav}>
      <div onClick={()=>setView("store")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:44,height:44,borderRadius:"50%",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🔥</div>
        <div>
          <div style={{color:"#fff",fontWeight:800,fontSize:15,lineHeight:1.2}}>Extintores Tepeyac del Bajío</div>
          <div style={{color:"rgba(255,255,255,0.8)",fontSize:11}}>Protección Contra Incendio</div>
        </div>
      </div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <button style={{...st.btn("#fff",RED),display:"flex",alignItems:"center",gap:6,fontWeight:700}} onClick={()=>setView("quote")}>
          Mi solicitud {total>0&&<span style={{background:RED,color:"#fff",borderRadius:"50%",width:20,height:20,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:11}}>{total}</span>}
        </button>
        {view!=="store"&&<button style={st.btn("rgba(255,255,255,0.2)","#fff")} onClick={()=>setView("store")}>Tienda</button>}
      </div>
    </nav>
  );

  const Modal = ({p,onClose}) => (
    <div style={st.ovl} onClick={onClose}>
      <div style={st.mod} onClick={e=>e.stopPropagation()}>
        <img src={p.img} alt={p.name} style={{width:"100%",height:200,objectFit:"cover",borderRadius:"16px 16px 0 0"}}/>
        <div style={{padding:24}}>
          <div style={{color:RED,fontWeight:700,fontSize:11,textTransform:"uppercase",marginBottom:4}}>{p.cat}</div>
          <h2 style={{margin:"0 0 6px",fontSize:20,fontWeight:800}}>{p.name}</h2>
          <p style={{fontSize:14,color:"#666",margin:"0 0 12px"}}>{p.desc}</p>
          <div style={{fontSize:22,fontWeight:800,color:RED,marginBottom:16}}>${p.price.toLocaleString("es-MX")} {p.priceUSD?"USD":"MXN"} / pieza</div>
          <h3 style={{margin:"0 0 10px",fontSize:14,fontWeight:700,borderBottom:"2px solid #f0f0f0",paddingBottom:8}}>Ficha Tecnica</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 16px",marginBottom:20}}>
            {Object.entries(p.ficha).map(([k,v])=>(
              <div key={k} style={{fontSize:13}}><span style={{color:"#888",fontWeight:600,textTransform:"capitalize"}}>{k.replace(/_/g," ")}: </span><span style={{fontWeight:500}}>{v}</span></div>
            ))}
          </div>
          <div style={{display:"flex",gap:10}}>
            <button style={{...st.btn(),flexGrow:1,padding:12,fontSize:14}} onClick={()=>add(p)}>Agregar a solicitud</button>
            <button style={{...st.btn("#f0f0f0","#333"),padding:"12px 18px"}} onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );

  if(view==="store") return (
    <div style={st.app}>
      <Navbar/>
      <div style={{background:"#8b0000",color:"#fff",textAlign:"center",padding:"28px 24px"}}>
        <h1 style={{margin:"0 0 6px",fontSize:26,fontWeight:800}}>Protege lo que más importa</h1>
        <p style={{margin:0,opacity:0.9,fontSize:14}}>Equipos certificados NOM — Asesoría sin costo — León, Gto. y todo México</p>
      </div>
      <div style={{background:"#fff8e1",borderBottom:"1px solid #f9a825",padding:"10px 24px",display:"flex",gap:20,flexWrap:"wrap",justifyContent:"center",fontSize:13}}>
        <span>León, Gto.: entrega personal + recarga a domicilio</span>
        <span>Señalética: envío a todo México</span>
        <span>Extintores/detectores: precio + envío según zona</span>
      </div>
      <div style={st.wrap}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {CATS.map(ct=><button key={ct} style={st.catBtn(cat===ct)} onClick={()=>setCat(ct)}>{ct}</button>)}
          </div>
          <input style={{border:"1.5px solid #ddd",borderRadius:6,padding:"9px 14px",fontSize:13,width:210,boxSizing:"border-box"}} placeholder="Buscar..." value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <div style={st.grid}>
          {filtered.map(p=>(
            <div key={p.id} style={{background:"#fff",borderRadius:12,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,0.08)",display:"flex",flexDirection:"column",cursor:"pointer"}} onClick={()=>setSel(p)}>
              <img src={p.img} alt={p.name} style={{width:"100%",height:180,objectFit:"cover"}} onError={e=>{e.target.style.display="none"}}/>
              <div style={{padding:16,display:"flex",flexDirection:"column",gap:6,flexGrow:1}}>
                <div style={{fontSize:11,color:RED,fontWeight:700,textTransform:"uppercase"}}>{p.cat}</div>
                <div style={{fontWeight:700,fontSize:15}}>{p.name}</div>
                <div style={{fontSize:13,color:"#666",flexGrow:1}}>{p.desc}</div>
                <div style={{fontWeight:800,fontSize:17,color:RED}}>${p.price.toLocaleString("es-MX")} {p.priceUSD?"USD":"MXN"}</div>
              </div>
              <button style={{background:RED,color:"#fff",border:"none",padding:"10px 0",cursor:"pointer",fontWeight:700,fontSize:13,width:"100%"}} onClick={e=>{e.stopPropagation();add(p);}}>Agregar a solicitud</button>
            </div>
          ))}
        </div>
        <div style={{marginTop:32}}>
          <QuienesSomos/>
          <Calculadora/>
          <FAQSection/>
        </div>
      </div>
      {sel&&<Modal p={sel} onClose={()=>setSel(null)}/>}
      <Footer/><WABtn/><Chatbot/>
    </div>
  );

  if(view==="quote") return (
    <div style={st.app}>
      <Navbar/>
      <div style={st.wrap}>
        <div style={st.sec}>
          <h2 style={{margin:"0 0 4px",fontSize:20,fontWeight:700}}>Mi solicitud</h2>
          <p style={{fontSize:13,color:"#888",margin:"0 0 20px"}}>Al enviar te abrimos WhatsApp con todos los detalles para cerrar tu pedido.</p>
          {list.length===0
            ? <div style={{textAlign:"center",color:"#999",padding:32}}>No has agregado productos.<br/><button style={{...st.btn(),marginTop:16}} onClick={()=>setView("store")}>Ver productos</button></div>
            : <>
              {list.map(x=>(
                <div key={x.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:"1px solid #f0f0f0"}}>
                  <img src={x.img} style={{width:48,height:48,objectFit:"cover",borderRadius:8,flexShrink:0}} alt=""/>
                  <div style={{flexGrow:1}}>
                    <div style={{fontWeight:600,fontSize:14}}>{x.name}</div>
                    <div style={{fontSize:12,color:"#888"}}>${x.price.toLocaleString("es-MX")} {x.priceUSD?"USD":"MXN"} / pieza</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <button style={st.btn("#eee","#333")} onClick={()=>upd(x.id,-1)}>-</button>
                    <span style={{fontWeight:700,minWidth:20,textAlign:"center"}}>{x.qty}</span>
                    <button style={st.btn("#eee","#333")} onClick={()=>upd(x.id,1)}>+</button>
                  </div>
                </div>
              ))}
              <div style={{marginTop:24,display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <div><label style={st.lbl}>Nombre *</label><input style={st.inp} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Tu nombre"/></div>
                <div><label style={st.lbl}>WhatsApp / Telefono *</label><input style={st.inp} value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="477 000 0000"/></div>
                <div style={{gridColumn:"1/-1"}}><label style={st.lbl}>Ciudad *</label><input style={st.inp} value={form.city} onChange={e=>setForm(f=>({...f,city:e.target.value}))} placeholder="Ej. Leon, Gto."/></div>
                <div style={{gridColumn:"1/-1"}}><label style={st.lbl}>Notas adicionales</label><textarea style={{...st.inp,height:70,resize:"vertical"}} value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} placeholder="Tipo de negocio, dudas, cantidad..."/></div>
              </div>
              <div style={{background:"#f0fff4",border:"1px solid #9ae6b4",borderRadius:8,padding:14,marginTop:16,fontSize:13}}>
                Al dar clic en Enviar por WhatsApp se abrira una conversacion con tu solicitud lista.
              </div>
              <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:16}}>
                <button style={st.btn("#eee","#333")} onClick={()=>setView("store")}>Seguir viendo</button>
                <button style={{...st.btn("#25d366"),fontSize:14,padding:"10px 20px"}} onClick={sendWA} disabled={!form.name||!form.phone||!form.city}>Enviar por WhatsApp</button>
              </div>
            </>
          }
        </div>
      </div>
      <Footer/><Chatbot/>
    </div>
  );
}
