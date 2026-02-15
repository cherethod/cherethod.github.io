var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
function bloquea(){
	setCookie('pwd','0');
}

function desbloquea(){
	setCookie('pwd','1');
}

function cargar_barra(lang) {
	barraIni();
	
	if (lang){
		document.getElementById("diccionario").setAttribute("onclick","busca_en('https://web.archive.org/web/20190126012855/https://dlc.iec.cat/results.asp?txtentrada=')");
		document.getElementById("traductor").setAttribute("onclick","busca_en('https://web.archive.org/web/20190126012855/http://translate.google.es/#auto|ca|')");
	} else {
		document.getElementById("diccionario").setAttribute("onclick","busca_en('https://web.archive.org/web/20190126012855/http://dle.rae.es/?w=')");
		document.getElementById("traductor").setAttribute("onclick","busca_en('https://web.archive.org/web/20190126012855/http://translate.google.es/#auto|es|')");
	}
		
	if (lang) menuIni('Bancs','bancos_tabla'); 
	else menuIni('Bancos','bancos_tabla');
		celda('Banca March','www.bancamarch.es');
		celda('Banco Mare Nostrum','www.bmn.es');
		celda('Banco Pastor','www.bancopastor.es');
		celda('Banco Popular','www.bancopopular.es');
		celda('Banco Santander','www.bancosantander.es');
		celda('Bankia','www.bankia.es');
		celda('Bankinter','www.bankinter.com');
		celda('BBVA','www.bbva.es');
		celda('Caja Espana','www.espanaduero.es');
		celda('Cajamar','www.cajamar.es');
		celda('CatalunyaCaixa','www.catalunyacaixa.com');
		celda('Citibank','www.citibank.com');
		celda('Deutsche Bank','www.deutschebank-dbdirect.com');
		celda('Evo','www.evobanco.com');
		celda('Ibercaja','www.ibercaja.es/');
		celda('ING Direct','www.ingdirect.es');
		celda('Kutxa','www.kutxabank.es');
		celda('La Caixa','www.lacaixa.es');
		celda('Ruralvia','www.ruralvia.com');
		celda('Sabadell','www.bancsabadell.com');
		celda('Self Bank','www.selfbank.es');
	menuFin();
	
	if (lang) menuIni('Correu','Correo_tabla');
	else menuIni('Correo','Correo_tabla');
		celda('Hotmail','www.hotmail.com');
		celda('Gmail','www.gmail.com');
		celda('Yahoo','mail.yahoo.com');
	menuFin();
	
	menuIni('Fútbol','futbol_tabla');
		celda('AS','as.com');
		celda('Marca','www.marca.com');
		celda('Mundo Deportivo','www.mundodeportivo.com');
		celda('Sport','www.sport.es');
		celda("FutbolTV","www.futbolenlatele.com/");
		celda("Clasificación Primera","www.marca.com/estadisticas/futbol/primera/clasificacion.html");
		celda("Clasificación Segunda","www.marca.com/estadisticas/futbol/segunda/clasificacion.html");
		celda("Calendario Primera","www.marca.com/deporte/futbol/primera-division/calendario/");
		celda("Calendario Segunda","www.marca.com/deporte/futbol/segunda-division/calendario/");
		celda("Champions","www.marca.com/estadisticas/futbol/champions/");
		celda("Copa del Rey","www.marca.com/estadisticas/futbol/copa_rey/");
	menuFin();
	
	if (lang) menuIni('Noticies','noticias_tabla');
	else menuIni('Noticias','noticias_tabla');
		celda('20Minutos','www.20minutos.es');
		celda('ABC','www.abc.es');
		celda('El Confidencial','www.elconfidencial.com');
		celda('El Economista','www.eleconomista.es');
		celda('Huffington Post','www.huffingtonpost.es');
		celda('El Mundo','www.elmundo.es');
		celda('El Pais','elpais.com');
		celda('La Vanguardia','www.lavanguardia.com');
		celda('Publico','www.publico.es');
	menuFin();
	
	
	
	menuIni('Radio','radio_tabla');
		celda('40 Principales','www.yes.fm/radio/fm/1/40-principales');
		celda('CADENA100','player.cadena100.es');
		celda('CadenaDial','www.yes.fm/radio/fm/2/cadena-dial');
		celda('Catalunya Radio','www.ccma.cat/catradio/directe/catalunya-radio');
		celda('COPE','www.cope.es/directo');
		celda('EuropaFM','www.europafm.com/directo');
		celda('FlaixBac','www.radioflaixbac.cat/repro.php');
		celda('FLAIXFM','www.flaixfm.cat/player');
		celda('KISSFM','kissfm.es/player');
		celda('M80','www.yes.fm/radio/fm/4/m80-radio');
		celda('MaximaFM','www.yes.fm/radio/fm/5/maxima-fm');
		celda('ONDACERO','www.ondacero.es/directo');
		celda('Punto Radio','www.emisora.org.es/punto');
		celda('Rac 105','www.rac105.cat');
		celda('Rac1','www.rac1.org');
		celda('RNE','www.rtve.es/radio/radionacional-endirecto');
		celda('RockFM','player.rockfm.fm');
		celda('SER','play.cadenaser.com');
		celda('Shoutcast','www.shoutcast.com');
		celda('senATwork','www.aburridos.tv/sen/musica/');
	menuFin();
	
	if (lang) menuIni('Xarxes','redes_tabla');
	else menuIni('Redes','redes_tabla');
		celda('Badoo','badoo.com');
		celda('Blogger','www.blogger.com');
		celda('Facebook','www.facebook.com');
		celda('Google Plus','plus.google.com');
		celda('Instagram','www.instagram.com');
		celda('LinkedIN','www.linkedin.com');
		celda('Pinterest','es.pinterest.com');
		celda('Twitter','www.twitter.com');
		celda('Wordpress','es.wordpress.org');
		celda('Youtube','www.youtube.com');
	menuFin();
	
	menuIni('Software','software_tabla');
		celda('AVG Antivirus','www.avg.com/ww-es/');
		celda('Adobe Reader','get.adobe.com/es/reader');
		celda('Chrome','www.google.es/chrome/browser/desktop');
		celda('CutePDF','www.cutepdf.com');
		celda('Flash Player','get.adobe.com/es/flashplayer');
		celda('Java','www.java.com/es/download');
		celda('MajorGeeks','majorgeeks.com');
		celda('Malware Bytes','es.malwarebytes.org');
		celda('TeamViewer','www.teamviewer.com');
		celda('uTorrent','www.utorrent.com');
		celda('Winamp','www.winamp.com');
		celda('Winrar','www.winrar.es/descargas');
	menuFin();
	
	if (lang) menuIni('Altres','Otros_tabla');
	else menuIni('Otros','Otros_tabla');
		celda('Amazon','www.amazon.es');
		celda('Calendar','calendar.google.com');
		celda('Contacts','contacts.google.com');
		celda('Drive','drive.google.com');
		celda('Dropbox','www.dropbox.com');
		celda('Gmail','mail.google.com');
		celda('Keep','keep.google.com');
		celda('Minijuegos','www.minijuegos.com');
		celda('Renfe','www.renfe.com');
		celda('Sincroguia','www.sincroguia.tv');
		celda('Wallapop','www.wallapop.com');
		celda('Wetransfer','www.wetransfer.com');
	menuFin();
	
	if (lang) menuIni('Personalitzar','perso_tabla');
	else menuIni('Personalizar','perso_tabla');
		idioma('Idioma Català','ca');
		idioma('Idioma Español','es');
		fondo('Butterfly');
		fondo('Globos');
		fondo('Gotas');
		fondo('Lines');
		fondo('Standard');
	menuFin();
	
	menuIni('XXX','xxx_tabla');
	if ( getCookie('pwd') == '1') {
		document.write('<tr><td align="center" bgcolor="red" colspan="2" onclick="bloquea()">BLOQUEAR</td></tr>');
		celda('Alrincon','www.alrincon.com');
		celda('Babesndgirls','www.babesandgirls.com');
		celda('Chaturbate','www.chaturbate.com');
		celda('Jizzhut','www.jizzhut.com');
		celda('Orgasmatrix','www.orgasmatrix.com');
		celda('Porndoe','www.porndoe.com');
		celda('Pornhd','www.pornhd.com');
		celda('Pornhub','www.pornhub.com');
		celda('PornkTube','www.pornktube.com');
		celda('Rec-tube','www.rec-tube.com');
		celda('Yonkis','www.yonkis.com');
	} else {
		document.write('<tr><td align="center" bgcolor="red" colspan="2" onclick="desbloquea()">CONTENIDO EXCLUSIVO PARA ADULTOS:<br> SOY MAYOR DE 18 AÑOS</td></tr>');
	}
	menuFin();
	
	barraFin();
}
}

/*
     FILE ARCHIVED ON 01:28:55 Jan 26, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 15:32:29 Feb 15, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.505
  exclusion.robots: 0.018
  exclusion.robots.policy: 0.009
  esindex: 0.012
  cdx.remote: 10.824
  LoadShardBlock: 221.681 (3)
  PetaboxLoader3.resolve: 552.974 (5)
  PetaboxLoader3.datanode: 184.783 (5)
  load_resource: 911.237 (2)
*/