function main() 
{
    /**
     * @type {HTMLCanvasElement} canvas
     */
    const canvas = document.getElementById('myCanvas-square');

    /**
     * @type {WebGLRenderingContext} gl
     */
    const gl = canvas.getContext('webgl');

    // Menentukan posisi titik-titik tersebut
    /**
     * A (-0.5, 0.5)
     * B (-0.5, -0.5)
     * C (0.5, -0.5)
     */

    // 3 titik pertama -> Untuk membuat segitiga ABC
    // 3 titik sisanya -> Untuk membuat segitiga CDA
    var vertices = [
        -0.5,
        0.5,  //titik A
        -0.5,
        -0.5, //titik B
        0.5,
        -0.5, //titik C
        0.5,
        -0.5, //titik C
        0.5,
        0.5,  //titik D
        -0.5,
        0.5,  //titik A
    ];

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    const vertexShaderCode = document.getElementById(
        'vertexShaderCode-square'
    ).textContent;

    // Membuat titik-titik
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    const fragmentShaderCode = document.getElementById(
        'fragmentShaderCode-square'
    ).textContent;

    // Membuat fragment warna
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    // Membuat program agar data dapat ditampilkan
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const aPosition = gl.getAttribLocation(shaderProgram, 'a_position');
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(0.13, 0.13, 0.13, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

main();