import { useOnDraw } from './Hooks';
import io from 'socket.io-client'
import { useEffect } from 'react';
import '../styles/Canvas.css';

const socket = io.connect("http://localhost:3001");

const Canvas = ({ width, height }) => {

    const {
        setCanvasRef,
        onCanvasMouseDown
    } = useOnDraw(onDraw);


    useEffect(() => {
        socket.on('recieveCanvasData', (data) => {
            let { prevPoint, point } = data.canvasData;
            if (prevPoint == null) prevPoint = point;
            const canvas = document.getElementById('myCanvas');
            const ctx = canvas.getContext('2d');
            drawLine(prevPoint, point, ctx, '#000000', 5);
        })
    }, [socket]);

    function onDraw(ctx, point, prevPoint) {
        drawLine(prevPoint, point, ctx, '#000000', 5);
        sendData(prevPoint, point);
    }

    function drawLine(
        start,
        end,
        ctx,
        color,
        width
    ) {
        console.log(start);
        start = start ?? end;
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
        ctx.fill();

    }

    function sendData(prevPoint, point) {
        const canvasData = { prevPoint, point };
        socket.emit('sendCanvasData', { canvasData });
    }

    return (
        <div className="canvasContainer">

            <canvas id='myCanvas'
                onMouseDown={onCanvasMouseDown}
                width={width}
                height={height}
                ref={setCanvasRef}
                style={canvasStyle}
            />
        </div>

    );

}

export default Canvas;

const canvasStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    cursor: 'crosshair',
};