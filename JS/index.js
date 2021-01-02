$(document).ready(main);

// Variables de Data

var Fecha_orden,orden_num;
// Datos Cliente
var nombre,cedula,email,direccion,municipio,celular;
// datos Moto
var marca,linea,modelo,revision,num_motor,num_chasis,
kilometraje,gasolina,placa,color,dejaCasco,llavero;
// variables check
var deja_llaves,soat_al_dia,revision_al_dia,deja_documentos;
// descipcion variable
var cliente_manifiesta,descripcion_trabajo,valor_mano_obra,
valor_trabajos_externos,repuestos_utilizados,valor_repuestos_utilizados,
observaciones,factura,nombre_mecanico,valor_total;


function main (){

        Cargar_all();

    $('body').on('click', '#registrar_ficha', function(){
        guardar_orden_LS();
        Cargar_all();
        Limpiar();
    });

    $('body').on('change', '#Mes_filtro', function(){
        var selec = document.querySelector('#Mes_filtro');
        // alert(selec.value)
        Recargar_Recientes();
          document.getElementById('placa_moto_id').value = '';
    });

    $('body').on('change', '#Empleado_filtro', function(){
        var selec = document.querySelector('#Empleado_filtro');
        // alert(selec.value)
        Recargar_Recientes();
          document.getElementById('placa_moto_id').value = ''; 
    });

    $('body').on('click', '#buscar-placa-moto', function(){
        Cargar_Placa();
        Limpiar();
    });

    $('body').on('click', '#limpiar_registros', function(){
        localStorage.clear();
        Cargar_all();
    });

   

}


function Cargar_all (){
    Cargar_Recientes();
    Cargar_Filtro_Mes();
    Cargar_Filtro_Empleado();
    Limpiar();
    
}

function Limpiar (){
    
    document.getElementById('orden_num').value= '';
    document.getElementById('fecha_orden').value = '';
    document.getElementById('nombre_cliente').value = '';
    document.getElementById('nombre_cliente').value= '';
    document.getElementById('cedula_cliente').value= '';
    document.getElementById('email_cliente').value= '';
    document.getElementById('direcciion_cliente').value= '';
    document.getElementById('municipio_cliente').value= '';
    document.getElementById('celular_cliente').value= '';

    document.getElementById('marca_moto').value= '-';
    document.getElementById('linea_moto').value= '';
    document.getElementById('modelo_moto').value= '';
    document.getElementById('revision_moto').value= '';
    document.getElementById('num_motor_moto').value= '';
    document.getElementById('num_chasis_moto').value= '';
    document.getElementById('kilometraje_moto').value= '';
    document.getElementById('placa_moto').value= '';
    document.getElementById('color_moto').value= '';

    document.getElementById('id_gasolina_moto_vacio').checked = false;
    document.getElementById('id_gasolina_moto_medio').checked = false;
    document.getElementById('id_gasolina_moto_lleno').checked = false;
    
    document.getElementById('id_deja_casco_moto_si').checked = false;
    document.getElementById('id_deja_casco_moto_no').checked = false;
    
    document.getElementById('id_llavero_si').checked = false;
    document.getElementById('id_llavero_no').checked = false;

    document.getElementById('id_llaves_si').checked = false;
    document.getElementById('id_llaves_no').checked = false;

    document.getElementById('id_soat_al_dia_si').checked = false;
    document.getElementById('id_soat_al_dia_no').checked = false;

    document.getElementById('id_revision_al_dia_si').checked = false;
    document.getElementById('id_revision_al_dia_no').checked = false;

    document.getElementById('id_deja_documentos_si').checked = false;
    document.getElementById('id_deja_documentos_no').checked = false;


    document.getElementById('cliente_manifiesta').value= '';
    document.getElementById('descripcion_del_trabajo').value= '';
    document.getElementById('valor_mano_obra').value= '';
    document.getElementById('valor_trabajos_extra').value= '';
    document.getElementById('repuestos_utilizados').value= '';
    document.getElementById('valor_repuestos').value= '';
    document.getElementById('observaciones').value= '';
    document.getElementById('factura_num').value= '';
    document.getElementById('nombre_mecanico').value= '-';
    document.getElementById('valor_total').value= '';
    

}

function Cargar_Recientes (){
    var obj_ficha_ls = JSON.parse(localStorage.getItem('obj_ficha_ls'));
    var recientes_id = document.getElementById('recientes_id');
    var varlor_total_input = document.getElementById('Valor_Total');
    var varlor_total_Mano_Obra_input = document.getElementById('Valor_Total_mano_obra');
    var varlor_total_Repuestos_input = document.getElementById('Valor_Total_respuestos');

    var html = "";
    var valor_total_init = 0;
    var varlor_total_Mano_Obra_init = 0;
    var varlor_total_Repuestos_init = 0;

    if (obj_ficha_ls != null) {
        for (let i = 0; i < obj_ficha_ls.length; i++) {
            html += `
            <div class="ordenes">
                <div class="numero_orden">
                    <span>N° ${obj_ficha_ls[i].obj_orden_num}</span>
                </div>
                <div class="titular_orden">
                    <span>${obj_ficha_ls[i].obj_nombre}</span>
                    <span>${obj_ficha_ls[i].obj_Fecha_orden}</span>
                </div>
                <div class="view_orden">
                    <button id="${obj_ficha_ls[i].obj_orden_num}" onclick="Mostrar_View_Orden(${obj_ficha_ls[i].obj_orden_num})">View</button>
                </div>
            </div>
            `;
            varlor_total_Mano_Obra_init += (obj_ficha_ls[i].obj_valor_trabajos_externos*1);
            varlor_total_Repuestos_init += (obj_ficha_ls[i].obj_valor_repuestos_utilizados*1);
            valor_total_init += (obj_ficha_ls[i].obj_valor_total*1);
        }
    }
  
    varlor_total_Mano_Obra_input.value = `$ ${new Intl.NumberFormat().format(varlor_total_Mano_Obra_init)}`;
    varlor_total_Repuestos_input.value = `$ ${new Intl.NumberFormat().format(varlor_total_Repuestos_init)}`;
    varlor_total_input.value = `$ ${new Intl.NumberFormat().format(valor_total_init)}`;
    recientes_id.innerHTML = '';
    recientes_id.innerHTML = html;

}

function Recargar_Recientes (){
    
    let empleado_fil = document.querySelector('#Empleado_filtro');
    let mes_fil = document.querySelector('#Mes_filtro');
    var obj_ficha_ls = JSON.parse(localStorage.getItem('obj_ficha_ls'));
    var recientes_id = document.getElementById('recientes_id');
    var varlor_total_Mano_Obra_input = document.getElementById('Valor_Total_mano_obra');
    var varlor_total_Repuestos_input = document.getElementById('Valor_Total_respuestos');
    var varlor_total_input = document.getElementById('Valor_Total');
    var html = "";
    var filtro_mes = 0,filtro_empleado = 0;
    var encontrados = 0;


    var varlor_total_Mano_Obra_re = 0;
    var varlor_total_Repuestos_re = 0;
    var valor_total_re = 0;

    if (empleado_fil.value != 'Todos') {
        filtro_empleado = 1;
    }
    if (mes_fil.value != 'Todos') {
        filtro_mes = 1;
    }

    if (obj_ficha_ls != null) {
        for (let i = 0; i < obj_ficha_ls.length; i++) {
            var mydate = new Date(obj_ficha_ls[i].obj_Fecha_orden);

            if (filtro_mes == 0 && filtro_empleado == 0) {      
                html += `
                <div class="ordenes">
                    <div class="numero_orden">
                        <span>N° ${obj_ficha_ls[i].obj_orden_num}</span>
                    </div>
                    <div class="titular_orden">
                        <span>${obj_ficha_ls[i].obj_nombre}</span>
                        <span>${obj_ficha_ls[i].obj_Fecha_orden}</span>
                    </div>
                    <div class="view_orden">
                        <button id="${obj_ficha_ls[i].obj_orden_num}" onclick="Mostrar_View_Orden(${obj_ficha_ls[i].obj_orden_num})">View</button>
                    </div>
                </div>
                `;
                encontrados = 1;
                varlor_total_Mano_Obra_re += (obj_ficha_ls[i].obj_valor_trabajos_externos*1);
                varlor_total_Repuestos_re += (obj_ficha_ls[i].obj_valor_repuestos_utilizados*1);
                valor_total_re += (obj_ficha_ls[i].obj_valor_total*1);
            }else if (filtro_mes == 0 && filtro_empleado == 1) {
                if (obj_ficha_ls[i].obj_nombre_mecanico == empleado_fil.value) {
                    html += `
                    <div class="ordenes">
                        <div class="numero_orden">
                            <span>N° ${obj_ficha_ls[i].obj_orden_num}</span>
                        </div>
                        <div class="titular_orden">
                            <span>${obj_ficha_ls[i].obj_nombre}</span>
                            <span>${obj_ficha_ls[i].obj_Fecha_orden}</span>
                        </div>
                        <div class="view_orden">
                            <button id="${obj_ficha_ls[i].obj_orden_num}" onclick="Mostrar_View_Orden(${obj_ficha_ls[i].obj_orden_num})">View</button>
                        </div>
                    </div>
                    `;
                    encontrados = 1;
                    varlor_total_Mano_Obra_re += (obj_ficha_ls[i].obj_valor_trabajos_externos*1);
                    varlor_total_Repuestos_re += (obj_ficha_ls[i].obj_valor_repuestos_utilizados*1);
                    valor_total_re += (obj_ficha_ls[i].obj_valor_total*1);
                }
            }else if (filtro_mes == 1 && filtro_empleado == 0) {
                if (Get_Mes(mydate.getMonth()) == mes_fil.value) {
                    html += `
                    <div class="ordenes">
                        <div class="numero_orden">
                            <span>N° ${obj_ficha_ls[i].obj_orden_num}</span>
                        </div>
                        <div class="titular_orden">
                            <span>${obj_ficha_ls[i].obj_nombre}</span>
                            <span>${obj_ficha_ls[i].obj_Fecha_orden}</span>
                        </div>
                        <div class="view_orden">
                            <button id="${obj_ficha_ls[i].obj_orden_num}" onclick="Mostrar_View_Orden(${obj_ficha_ls[i].obj_orden_num})">View</button>
                        </div>
                    </div>
                    `;
                    encontrados = 1;
                    varlor_total_Mano_Obra_re += (obj_ficha_ls[i].obj_valor_trabajos_externos*1);
                    varlor_total_Repuestos_re += (obj_ficha_ls[i].obj_valor_repuestos_utilizados*1);
                    valor_total_re += (obj_ficha_ls[i].obj_valor_total*1);
                }
            }else if (filtro_mes == 1 && filtro_empleado == 1) {
                if (Get_Mes(mydate.getMonth()) == mes_fil.value && obj_ficha_ls[i].obj_nombre_mecanico == empleado_fil.value) {
                    html += `
                    <div class="ordenes">
                        <div class="numero_orden">
                            <span>N° ${obj_ficha_ls[i].obj_orden_num}</span>
                        </div>
                        <div class="titular_orden">
                            <span>${obj_ficha_ls[i].obj_nombre}</span>
                            <span>${obj_ficha_ls[i].obj_Fecha_orden}</span>
                        </div>
                        <div class="view_orden">
                            <button id="${obj_ficha_ls[i].obj_orden_num}" onclick="Mostrar_View_Orden(${obj_ficha_ls[i].obj_orden_num})">View</button>
                        </div>
                    </div>
                    `; 
                    encontrados = 1;
                    varlor_total_Mano_Obra_re += (obj_ficha_ls[i].obj_valor_trabajos_externos*1);
                    varlor_total_Repuestos_re += (obj_ficha_ls[i].obj_valor_repuestos_utilizados*1);
                    valor_total_re += (obj_ficha_ls[i].obj_valor_total*1);
                }
            }
        }
    }

    if (encontrados == 0) {
        html += `
        <div class="no-encontrados-recientes"> 
            <p>No se Encontraron Resultados Para: <br>
            <span class="mes_emple">${empleado_fil.value}</span> <br>
            en el Mes de: <br>
            <span class="mes_emple">${mes_fil.value}</span>
            </p>
        </div>
        `;
    }

    varlor_total_Mano_Obra_input.value = `$ ${new Intl.NumberFormat().format(varlor_total_Mano_Obra_re)}`;
    varlor_total_Repuestos_input.value = `$ ${new Intl.NumberFormat().format(varlor_total_Repuestos_re)}`;
    varlor_total_input.value = `$ ${new Intl.NumberFormat().format(valor_total_re)}`;
    recientes_id.innerHTML = '';
    recientes_id.innerHTML = html;


}

function Cargar_Placa (){
    var obj_ficha_ls = JSON.parse(localStorage.getItem('obj_ficha_ls'));
    var recientes_id = document.getElementById('recientes_id');
    var varlor_total_Mano_Obra_input = document.getElementById('Valor_Total_mano_obra');
    var varlor_total_Repuestos_input = document.getElementById('Valor_Total_respuestos');
    var varlor_total_input = document.getElementById('Valor_Total');
    var id_input_placa_moto = document.getElementById('placa_moto_id');
    var html = "";
    var varlor_total_Mano_Obra_init = 0;
    var varlor_total_Repuestos_init = 0;
    var valor_total_init = 0;
    var encontrados = 0;
    
    if (obj_ficha_ls != null) {
        for (let i = 0; i < obj_ficha_ls.length; i++) {
            if (obj_ficha_ls[i].obj_placa == id_input_placa_moto.value) {
                html += `
                    <div class="ordenes">
                        <div class="numero_orden">
                            <span>N° ${obj_ficha_ls[i].obj_orden_num}</span>
                        </div>
                        <div class="titular_orden">
                            <span>${obj_ficha_ls[i].obj_nombre}</span>
                            <span>${obj_ficha_ls[i].obj_Fecha_orden}</span>
                        </div>
                        <div class="view_orden">
                            <button id="${obj_ficha_ls[i].obj_orden_num}" onclick="Mostrar_View_Orden(${obj_ficha_ls[i].obj_orden_num})">View</button>
                        </div>
                    </div>
                    `;
                encontrados = 1;
                varlor_total_Mano_Obra_init += (obj_ficha_ls[i].obj_valor_trabajos_externos*1);
                varlor_total_Repuestos_init += (obj_ficha_ls[i].obj_valor_repuestos_utilizados*1);
                valor_total_init += (obj_ficha_ls[i].obj_valor_total*1);
            }
        }
    }

    if (encontrados == 0) {
        html += `
        <div class="no-encontrados-recientes"> 
            <p>No se Encontraron Resultados Para la Placa: <br>
            <span class="mes_emple">${id_input_placa_moto.value}</span> <br>
            </p>
        </div>
        `;
    }
    varlor_total_Mano_Obra_input.value = `$ ${new Intl.NumberFormat().format(varlor_total_Mano_Obra_init)}`;
    varlor_total_Repuestos_input.value = `$ ${new Intl.NumberFormat().format(varlor_total_Repuestos_init)}`;
    varlor_total_input.value = `$ ${new Intl.NumberFormat().format(valor_total_init)}`;
    recientes_id.innerHTML = '';
    recientes_id.innerHTML = html;
 
}

function Obtener_Array_mes (){
    var obj_ficha_ls = JSON.parse(localStorage.getItem('obj_ficha_ls'));
    var array_mes = [];
    var newArray;

   
    if (obj_ficha_ls != null) {
        for (let i = 0; i < (obj_ficha_ls.length); i++) {     
            var mydate = new Date(obj_ficha_ls[i].obj_Fecha_orden);
            var obj = {
                mes_a: mydate.getMonth()
            };
            array_mes.push(obj);         
        }
    } 
    var newArray = removeDuplicates(array_mes, "mes_a");
    
    newArray.sort(function (a, b) { 
        if (a.mes_a < b.mes_a) {
          return -1;
        }
        if (a.mes_a > b.mes_a) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });

    return newArray;
}

function Obtener_Array_Empleado (){
    var obj_ficha_ls = JSON.parse(localStorage.getItem('obj_ficha_ls'));
    var array_empleado = [];
    var newArray;

    if (obj_ficha_ls != null) {
        for (var i = 0; i < (obj_ficha_ls.length); i++) {    
           
            var obj = {
                empleado_a: obj_ficha_ls[i].obj_nombre_mecanico
            };
            array_empleado.push(obj);         
        }
    } 
    var newArray = removeDuplicates(array_empleado, "empleado_a");

    return newArray;
}


function Cargar_Filtro_Mes (){
    var obj_ficha_ls = Obtener_Array_mes();
    var selector = document.querySelector('#Mes_filtro');
    var bandera = 0;
    // console.log(obj_ficha_ls);
    if (obj_ficha_ls != null) {
        for (let i = 0; i < (obj_ficha_ls.length+1); i++) {  

            if (i==0) {
                selector.options[i] = new Option(`Todos`);
            }else{
                selector.options[i] = new Option(Get_Mes(obj_ficha_ls[i-1].mes_a)); 
            }

            // selector.options[0] = new Option(`Todos`);
            // if (obj_ficha_ls.length > 0) {
            //     selector.options[i] = new Option(Get_Mes(obj_ficha_ls[i-1].mes_a)); 
            // }

            // if (bandera==0) {
            //     selector.options[i] = new Option(`Todos`);
            //     bandera=1;      
            // }else{
            //     selector.options[i] = new Option(Get_Mes(obj_ficha_ls[i-1].mes_a)); 
            // }
        }
    }  
}


function Cargar_Filtro_Empleado (){
    var obj_ficha_ls = Obtener_Array_Empleado();
    var selector = document.querySelector('#Empleado_filtro');
    var bandera = 0;

    if (obj_ficha_ls != null) {
        for (let i = 0; i < (obj_ficha_ls.length+1); i++) { 

            if (i==0) {
                selector.options[i] = new Option(`Todos`);
            }else{
                selector.options[i] = new Option(obj_ficha_ls[i-1].empleado_a); 
            }
            // selector.options[0] = new Option(`Todos`);
            // if (obj_ficha_ls.length > 0) {
            //     selector.options[i] = new Option(obj_ficha_ls[i-1].empleado_a); 
            // }

            // if (bandera==0) {
            //     selector.options[i] = new Option(`Todos`);
            //     bandera=1;      
            // }else{
            //     selector.options[i] = new Option(obj_ficha_ls[i-1].empleado_a); 
            // }
        }
    }  
}

function Mostrar_View_Orden(id){
    var obj_ficha_ls = JSON.parse(localStorage.getItem('obj_ficha_ls'));

    if (document.getElementById('orden_num').value == id) {
        Limpiar();
    } else {
        if (obj_ficha_ls != null) {
            for (let i = 0; i < obj_ficha_ls.length; i++) {
               if (obj_ficha_ls[i].obj_orden_num == id) {
                   
                    document.getElementById('orden_num').value = obj_ficha_ls[i].obj_orden_num;
                    document.getElementById('fecha_orden').value = obj_ficha_ls[i].obj_Fecha_orden;
                    document.getElementById('nombre_cliente').value = obj_ficha_ls[i].obj_nombre;
                    document.getElementById('cedula_cliente').value= obj_ficha_ls[i].obj_cedula;
                    document.getElementById('email_cliente').value= obj_ficha_ls[i].obj_email;
                    document.getElementById('direcciion_cliente').value= obj_ficha_ls[i].obj_direccion;
                    document.getElementById('municipio_cliente').value= obj_ficha_ls[i].obj_municipio;
                    document.getElementById('celular_cliente').value= obj_ficha_ls[i].obj_celular;
                
                    document.getElementById('marca_moto').value= obj_ficha_ls[i].obj_marca;
                    document.getElementById('linea_moto').value= obj_ficha_ls[i].obj_linea;
                    document.getElementById('modelo_moto').value= obj_ficha_ls[i].obj_modelo;
                    document.getElementById('revision_moto').value= obj_ficha_ls[i].obj_revision;
                    document.getElementById('num_motor_moto').value= obj_ficha_ls[i].obj_num_motor;
                    document.getElementById('num_chasis_moto').value= obj_ficha_ls[i].obj_num_chasis;
                    document.getElementById('kilometraje_moto').value= obj_ficha_ls[i].obj_kilometraje;
                    document.getElementById('placa_moto').value= obj_ficha_ls[i].obj_placa;
                    document.getElementById('color_moto').value= obj_ficha_ls[i].obj_color;

                    if (obj_ficha_ls[i].obj_gasolina == 'vacio') {
                        document.getElementById('id_gasolina_moto_vacio').checked = true;
                    } else if (obj_ficha_ls[i].obj_gasolina == 'medio') {
                        document.getElementById('id_gasolina_moto_medio').checked = true; 
                    }else if (obj_ficha_ls[i].obj_gasolina == 'lleno') {
                        document.getElementById('id_gasolina_moto_lleno').checked = true;
                    }
                                        
                    if (obj_ficha_ls[i].obj_dejaCasco == true) {
                        document.getElementById('id_deja_casco_moto_si').checked = true;
                    } else {
                        document.getElementById('id_deja_casco_moto_no').checked = true;
                    }

                    if (obj_ficha_ls[i].obj_llavero == true) {
                        document.getElementById('id_llavero_si').checked = true;
                    } else {
                        document.getElementById('id_llavero_no').checked = true;
                    }

                    if (obj_ficha_ls[i].obj_deja_llaves == true) {
                        document.getElementById('id_llaves_si').checked = true;
                    } else {
                        document.getElementById('id_llaves_no').checked = true;
                    }

                    if (obj_ficha_ls[i].obj_soat_al_dia == true) {
                        document.getElementById('id_soat_al_dia_si').checked = true;
                    } else {
                        document.getElementById('id_soat_al_dia_no').checked = true;
                    }

                    if (obj_ficha_ls[i].obj_revision_al_dia == true) {
                        document.getElementById('id_revision_al_dia_si').checked = true;
                    } else {
                        document.getElementById('id_revision_al_dia_no').checked = true;
                    }

                    if (obj_ficha_ls[i].obj_deja_documentos == true) {
                        document.getElementById('id_deja_documentos_si').checked = true;
                    } else {
                        document.getElementById('id_deja_documentos_no').checked = true;
                    }

                    document.getElementById('cliente_manifiesta').value= obj_ficha_ls[i].obj_cliente_manifiesta;
                    document.getElementById('descripcion_del_trabajo').value= obj_ficha_ls[i].obj_descripcion_trabajo;
                    document.getElementById('valor_mano_obra').value= obj_ficha_ls[i].obj_valor_mano_obra;
                    document.getElementById('valor_trabajos_extra').value= obj_ficha_ls[i].obj_valor_trabajos_externos;
                    document.getElementById('repuestos_utilizados').value= obj_ficha_ls[i].obj_repuestos_utilizados;
                    document.getElementById('valor_repuestos').value= obj_ficha_ls[i].obj_valor_repuestos_utilizados;
                    document.getElementById('observaciones').value= obj_ficha_ls[i].obj_observaciones;
                    document.getElementById('factura_num').value= obj_ficha_ls[i].obj_factura;
                    document.getElementById('nombre_mecanico').value= obj_ficha_ls[i].obj_nombre_mecanico;
                    document.getElementById('valor_total').value= obj_ficha_ls[i].obj_valor_total;
               }
            }
        }   
    }
}

function guardar_orden_LS (){

    var obj_Ficha;

    orden_num = document.getElementById('orden_num').value*1;
    Fecha_orden = document.getElementById('fecha_orden').value;
    nombre = document.getElementById('nombre_cliente').value;
    cedula = document.getElementById('cedula_cliente').value;
    email = document.getElementById('email_cliente').value;
    direccion = document.getElementById('direcciion_cliente').value;
    municipio = document.getElementById('municipio_cliente').value;
    celular = document.getElementById('celular_cliente').value;

    // Datos Moto

    marca = document.getElementById('marca_moto').value;
    linea = document.getElementById('linea_moto').value;
    modelo = document.getElementById('modelo_moto').value;
    revision = document.getElementById('revision_moto').value;
    num_motor = document.getElementById('num_motor_moto').value;
    num_chasis = document.getElementById('num_chasis_moto').value;
    kilometraje = document.getElementById('kilometraje_moto').value;
    placa = document.getElementById('placa_moto').value;
    color = document.getElementById('color_moto').value;
    
    gasolina = $('input[name=gasolina_moto]:checked').val();

    if ($('input[name=deja_casco_moto]:checked').val() == 'si') {
        dejaCasco =  true;
    } else {
        dejaCasco =  false;
    }
    
    if ($('input[name=deja_llavero]:checked').val() == 'si') {
        llavero = true;
    } else {
        llavero = false;
    }
  
    if ($('input[name=deja_llaves]:checked').val() == 'si') {
        deja_llaves = true;
    }else{
        deja_llaves = false;
    }
    
    if ( $('input[name=soat_al_dia]:checked').val() == 'si') {
        soat_al_dia = true;
    } else {
        soat_al_dia = false;
    }

    if ($('input[name=revision_al_dia]:checked').val() == 'si') {
        revision_al_dia = true;
    } else {
        revision_al_dia = false;
    }
  
    if ($('input[name=deja_documentos]:checked').val() == 'si') {
        deja_documentos = true;
    }else{
        deja_documentos = false;
    }
   

  
 

    cliente_manifiesta = document.getElementById('cliente_manifiesta').value;
    descripcion_trabajo = document.getElementById('descripcion_del_trabajo').value;
    valor_mano_obra = document.getElementById('valor_mano_obra').value;
    valor_trabajos_externos = document.getElementById('valor_trabajos_extra').value;
    repuestos_utilizados = document.getElementById('repuestos_utilizados').value;
    valor_repuestos_utilizados = document.getElementById('valor_repuestos').value;
    observaciones = document.getElementById('observaciones').value;
    factura = document.getElementById('factura_num').value;
    nombre_mecanico = document.getElementById('nombre_mecanico').value;
    valor_total = document.getElementById('valor_total').value;

        
    


    obj_Ficha = {
        obj_orden_num: orden_num,
        obj_Fecha_orden: Fecha_orden,
        obj_nombre: nombre,
        obj_cedula: cedula,
        obj_email: email,
        obj_direccion: direccion,
        obj_municipio: municipio,
        obj_celular: celular,

        obj_marca: marca,
        obj_linea: linea,
        obj_modelo: modelo,
        obj_revision: revision,
        obj_num_motor: num_motor,
        obj_num_chasis: num_chasis,
        obj_kilometraje: kilometraje,
        obj_gasolina: gasolina,
        obj_placa: placa,
        obj_color: color,
        obj_dejaCasco: dejaCasco,
        obj_llavero: llavero,
        
        obj_deja_llaves: deja_llaves,
        obj_soat_al_dia: soat_al_dia,
        obj_revision_al_dia: revision_al_dia,
        obj_deja_documentos: deja_documentos,

        obj_cliente_manifiesta: cliente_manifiesta,
        obj_descripcion_trabajo: descripcion_trabajo,
        obj_valor_mano_obra: valor_mano_obra,
        obj_valor_trabajos_externos: valor_trabajos_externos,
        obj_repuestos_utilizados: repuestos_utilizados,
        obj_valor_repuestos_utilizados: valor_repuestos_utilizados,
        obj_observaciones: observaciones,
        obj_factura: factura,
        obj_nombre_mecanico: nombre_mecanico,
        obj_valor_total: valor_total        
    }

    console.log(obj_Ficha); 
   

    if (localStorage.getItem('obj_ficha_ls') === null) {
        let obj_ficha_ls = [];
        obj_ficha_ls.push(obj_Ficha);
        localStorage.setItem('obj_ficha_ls', JSON.stringify(obj_ficha_ls));
    }else{
        let obj_ficha_ls = JSON.parse(localStorage.getItem('obj_ficha_ls'));

        obj_ficha_ls.push(obj_Ficha);
        localStorage.setItem('obj_ficha_ls', JSON.stringify(obj_ficha_ls));
    }
}

// funcion para pasar de numero a mes 
function Get_Mes (mes_number){
    var mes = "";
    if (mes_number == 0) {
         mes = `Enero`
    }else 
    if (mes_number == 1) {
        mes = `Febrero`
    }else 
    if (mes_number == 2) {
        mes = `Marzo`
    }else 
    if (mes_number == 3) {
        mes = `Abril`
    }else 
    if (mes_number == 4) {
        mes = `Mayo`
    }else 
    if (mes_number == 5) {
        mes = `Junio`
    }else 
    if (mes_number == 6) {
        mes = `Julio`
    }else 
    if (mes_number == 7) {
        mes = `Agosto`
    }else 
    if (mes_number == 8) {
        mes = `Septiembre`
    }else 
    if (mes_number == 9) {
        mes = `Octubre`
    }else 
    if (mes_number == 10) {
        mes = `Noviembre`
    }else 
    if (mes_number == 11) {
        mes = `Diciembre`
    }

    return mes;
}

//Eliminar Duplicados de JSON
function removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};
    
    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}