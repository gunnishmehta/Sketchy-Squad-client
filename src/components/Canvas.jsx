import { socket } from '../service/SocketProvider'
import { useOnDraw } from './Hooks';
import { useEffect, useState } from 'react';
import '../styles/Canvas.css';

const Canvas = ({ width, height }) => {

    const [isHost, setIsHost] = useState(false);

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
        socket.on("joinGame", ({ hostSocketId }) => {
            if (hostSocketId === socket.id) {
                setIsHost(true);
            } else {
                setIsHost(false);
            }
        })
        socket.on("changeWordRes", ({ hostSocketId }) => {
            console.log(hostSocketId);
            if (hostSocketId === socket.id) {
                setIsHost(true);
                alert('you are the host now');
            } else {
                setIsHost(false);
            }
            eraseEverything();
        })
    }, [socket]);

    function eraseEverything() {
        const canvas = document.getElementById('myCanvas');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    function onDraw(ctx, point, prevPoint) {
        if (isHost) {
            drawLine(prevPoint, point, ctx, '#000000', 5);
            sendData(prevPoint, point);
        }
    }

    function drawLine(
        start,
        end,
        ctx,
        color,
        width
    ) {
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