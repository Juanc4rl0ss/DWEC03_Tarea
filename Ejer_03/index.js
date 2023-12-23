
window.addEventListener('click', function(){
    const prueba = document.getElementsByTagName('audio')[1]
    prueba.currentTime=0;   // para poner al empiece el audio cada vez, sino, tendriamos que esperar a que acabase el audio.
    prueba.play()           // se reproduce el audio en cuestion.
});