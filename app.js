const node = new Ipfs({ repo: 'ipfs-' + Math.random() })
const {Buffer} = Ipfs

document.getElementById('main').style.visibility = 'hidden'

node.once('ready', async () => {
    const version = await node.version()
    console.log('Online status: ', node.isOnline() ? 'online' : 'offline')
    console.log(version.version)

    document.getElementById('main').style.visibility = 'visible'
    document.getElementById('load').style.visibility = 'hidden'
})

var browse_btn = document.querySelector('.browse-btn')
var file = document.getElementById('file')
var file_info = document.querySelector('.file-info')

browse_btn.addEventListener('click', (e) => {
    file.click()
})

file.addEventListener('change', () => {
    file_info.innerHTML = file.files[0].name
})



const getValue = () => {

    var fileValue = file.files[0]
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
        
        console.log('Added file:', filesAdded[0].path, filesAdded[0].hash)

        document.getElementById('hash').href = `https://ipfs.io/ipfs/${filesAdded[0].hash}`
        document.getElementById('message').innerHTML = "You can now view your file here: "
        document.getElementById('hash').innerHTML = `https://ipfs.io/ipfs/${filesAdded[0].hash}`
    })
    
    if(fileType[0] == 'image') {
        reader.readAsArrayBuffer(fileValue)
    } else if(fileType[0] == 'text') {
        reader.readAsText(fileValue)
    }
    
}
