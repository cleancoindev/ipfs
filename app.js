
// Hide and show elements on load
document.getElementById('main').style.visibility = 'hidden'
document.getElementById('footer-alert').style.visibility = 'hidden'
document.getElementById('footer-success').style.visibility = 'hidden'
document.querySelector('.dev').style.visibility = 'hidden'

// Setting up IPFS
const node = new Ipfs({ repo: 'ipfs-' + Math.random() })
const {Buffer} = Ipfs

// Checking for IPFS node availability
node.once('ready', async () => {
    // const version = await node.version()
    // console.log('Online status: ', node.isOnline() ? 'online' : 'offline')
    // console.log(version.version)

    document.querySelector('.load').style.visibility = 'hidden'
    document.getElementById('main').style.visibility = 'visible'
    document.querySelector('.dev').style.visibility = 'visible'
})

var browse_btn = document.querySelector('.browse-btn')
var file = document.getElementById('file')
var file_info = document.querySelector('.file-info')

// Browse button
browse_btn.addEventListener('click', (e) => {
    file.click()
})

// Input listener
file.addEventListener('change', () => {
    file_info.innerHTML = file.files[0].name
})


// Upload Button
const getValue = () => {

    var fileValue = file.files[0]

    if(fileValue) {
        document.getElementById('footer-alert').style.visibility = 'hidden'

        var filePath = document.getElementById('file').value
        var fileType = fileValue.type.split('/')

        let reader = new FileReader()    

        reader.addEventListener('loadend', async () => {
            let content = reader.result

            var buffer = Buffer.from(content)
        
            const filesAdded = await node.add({
                path: filePath,
                content: buffer
            })
            
            // console.log('Added file:', filesAdded[0].path, filesAdded[0].hash)

            document.getElementById('footer-success').style.visibility = 'visible'

            document.querySelector('.alert-link').href = `https://ipfs.io/ipfs/${filesAdded[0].hash}`
            document.querySelector('.alert-link').innerHTML = `${filesAdded[0].hash}`

            fileValue = ''
            document.getElementById('file').value = ''
            document.querySelector('.file-info').innerHTML = 'Upload a file'
        })
        
        if(fileType[0] == 'image') {
            reader.readAsArrayBuffer(fileValue)
        } else if(fileType[0] == 'text') {
            reader.readAsText(fileValue)
        }
    } else {
        document.getElementById('footer-success').style.visibility = 'hidden'
        document.getElementById('footer-alert').style.visibility = 'visible'
    }

}



// Particle settings
window.onload = function() {
    Particles.init({
      selector: '.background'
    });
};

Particles.init({
  
    // normal options
    selector: '.background',
    maxParticles: 70,
    color: "#aba7a7",
    connectParticles: false


});