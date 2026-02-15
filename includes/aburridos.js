var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
function redimensiona() {
	if (screen.width > screen.height) {
		buscador.style.width = "50%";
		logotipo.style.width = "15%";
		tabla_iconos.style.width = "50%";
	} else {
		buscador.style.width = "90%";
		logotipo.style.width = "30%";
		tabla_iconos.style.width = "100%";
	}
}

function aprietaEnter(e) {
	if (e.keyCode == 13) {
		busca_en("https://web.archive.org/web/20190126120003/https://www.google.es/search?q=");
	}
	else {
		buscador.focus();
	}
}

function esconde_menu() {
	var x = document.getElementsByClassName("menu_sub");
	var i;
	for (i = 0; i < x.length; i++) {
		x[i].style.visibility='hidden';
		x[i].style.position = 'absolute';
	}
}

function esconde_todo(){
	menu_superior.style.visibility='hidden';
	esconde_menu();
	desmarca_todo();
	//buscador.focus();
}

var seve = '0';
var id_tabla = '';

function muestra(obj) {
	//alert(obj.id);
	esconde_menu();
	if ((seve == '1')&&(id_tabla == obj.id)) { 
		seve = '0';
		obj.style.visibility = 'hidden';
		obj.style.position = 'absolute';
	} else {
		id_tabla = obj.id;
		seve = '1'; 
		obj.style.visibility = 'visible';
		obj.style.position = 'relative';
	}
}

function esconde(obj) {
	obj.style.visibility = 'hidden';
	obj.style.position = 'absolute';
}
function abre(dir){
	window.open('http://'+dir,'_blank');
}

function abre_s(dir){
	window.open(dir,'_blank');
}

function busca_en(q) {
	window.open(q+buscador.value,'_blank');
}

function desmarca_todo(){
	var x = document.getElementsByClassName("menu_sub_inicial");
	var i;
	for (i = 0; i < x.length; i++) {
		x[i].style.color = "black";
		// x[i].style.backgroundColor = "grey";
	}
}

function marca(n){
	menu_superior.scrollTop = "0";
	desmarca_todo();
	n.style.color = "black";
	// n.style.backgroundColor = " #C0C0FF";
}

function darBrillo(n){
	// n.style.backgroundColor = "#C0C0FF";
	n.style.color ="white";
}

function quitarBrillo(n){
	// n.style.backgroundColor = "grey";
	n.style.color ="black";
}

//barra

function barraIni(){
	document.write('<table class="barra">');
}
function barraFin(){
	document.write('</table>');
}

function menuIni(titulo,nombre) {
	document.write("<table class='menu_titulo' width='100%'>");
	document.write("<tr NOWRAP class='menu_sub_inicial' id='"+ titulo +"' onmouseover='darBrillo(this)' onmouseout='quitarBrillo(this)' onclick='muestra("+nombre+"); marca(this);'>");
	document.write("<td>"+ titulo +"</td><td width='10' align='right'><img src='img/flecha.gif'></td></tr></table>");
	document.write("<table id='"+ nombre +"' name='"+ nombre +"' class='menu_sub'>");
	//onmouseout='esconde("+nombre+")'
}

function menuFin() {
	document.write('</table><hr class="barra_menu">'); 
}

function celda(titulo,dir){
	const titulofix = titulo.replace(/ /g, "_");
	document.write("<tr><td NOWRAP class='celda' onclick=abre('"+dir+"')><img src='./media/" + titulofix +".png' style='border: 1px grey solid;'> " + titulo +"</td></tr>");
}

function celda_s(titulo,dir){
	const titulofix = titulo.replace(/ /g, "_");
	document.write("<tr><td NOWRAP class='celda' onclick=abre_s('"+dir+"')><img src='./media/" + titulofix +".png' style='border: 1px grey solid;'> " + titulo +"</td></tr>");
}

function idioma(titulo,idioma){
	document.write("<tr><td NOWRAP class='celda' onclick=setCookie('lang','"+idioma+"')><img width='16' height='16' src='./media/" + idioma +".png' style='border: 1px grey solid;'> " + titulo +"</td></tr>");
}

function fondo(titulo){
	document.write("<tr><td NOWRAP class='celda' onclick=setCookie('background','"+titulo+"')><img width='16' height='16' src='./media/" + titulo +".png' style='border: 1px grey solid;'> Wallpaper " + titulo +"</td></tr>");
}

function menu_abre(e){
	const menu_superior = document.getElementById("menu_superior");
	menu_superior.classList.toggle("visible");
	
	// menu_superior.style.visibility='visible';
	// menu_superior.scrollTop = "0";
}
}