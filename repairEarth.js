/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
var vt;
// const data = [{ id: 'root', children: [{ id: '1' }, { id: '3', children: [{ id: '4' }] }] }];
let treeData = [];

// var s = '';

window.onload = function () {
    var btn = document.querySelector('button');
    var svg = document.querySelector('svg');
    fetch('https://blue-dashing-firefly.glitch.me/tree_data')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        treeData = data
        updateTree();
    });

    btn.addEventListener('click', function () {
        svg = document.querySelector('svg');
        console.log(svg);
        let { width, height } = svg.getBBox();
        let clonedSvgElement = svg.cloneNode(true);

        let outerHTML = clonedSvgElement.outerHTML,
            blob = new Blob([outerHTML], { type: 'image/svg+xml;charset=utf-8' });
        let URL = window.URL || window.webkitURL || window;
        let blobURL = URL.createObjectURL(blob);
        let image = new Image();
        image.onload = () => {

            let canvas = document.createElement('canvas');

            canvas.widht = width;

            canvas.height = height;
            let context = canvas.getContext('2d');
            // draw image in canvas starting left-0 , top - 0  
            context.drawImage(image, 0, 0, width, height);
            //  downloadImage(canvas); need to implement
        };
        image.src = blobURL;
        console.log(image.src);
    });

    let successFulCompletion = false;
    const addDataToId = async (arr, id, children) => {
      console.log(arr)
      await arr.forEach(i => {
        if (i.id == id) {
          i.children = [...(i.children || []), ...children];
          successFulCompletion = true;
        } else {

          addDataToId(i.children || [], id, children)
        }
      })
    }
    document.getElementById('btnSubmit').addEventListener('click', () => {
      successFulCompletion = false;
      let owner = document.getElementById('fname').value;
      let child1 = document.getElementById('lname').value;
      let child2 = document.getElementById('rname').value;
      let child3 = document.getElementById('dname').value;

      let pushData = [{ id: owner, children: [{ id: child1, children: [] }, { id: child2, children: [] }, { id: child3, children: [] }] }]

      console.log(pushData[0].children)
      addDataToId(treeData, owner, pushData[0].children).then(e => {
        console.log(e)
        console.log(successFulCompletion);
        if (successFulCompletion == false) {
          treeData.push(pushData[0])
        }
        // console.log(data);

        postTreeData()

      });

    });
    function postTreeData() {
        // http://127.0.0.1:3000
        // node-kwxhxr--3000.local.webcontainer.io
      fetch('https://blue-dashing-firefly.glitch.me/post_trees',
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(treeData)
        })
        .then(response => response.json())
        .then((data) => {
          // console.log(data)
          updateTree();
        }

        )
    }


    document.getElementById('generateSvg').addEventListener('click', () => {
        createSvgString();

    });
 

    var container = document.getElementById("container");
    var msg = document.getElementById("msg");
    vt = new VTree(container);
    var reader = new VTree.reader.Object();

   function updateTree() {


        msg.innerHTML = '';


       let finalTreeData = JSON.stringify(treeData)
        try {
            var jsonData = JSON.parse(finalTreeData);
        } catch (e) {
            msg.innerHTML = 'JSON parse error: ' + e.message;
        }

        var data = reader.read(jsonData);

        vt.data(data)
            .update();
    }

    function createSvgString() {
        // let v = vt.createSvgString();
        // console.log(vt);

        // document.getElementById("svg-text").value = vt.createSvgString();
    }

    // document.getElementById("go-button").onclick = updateTree;
    // document.getElementById("svg-button").onclick = createSvgString;

    // updateTree();
};
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

