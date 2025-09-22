
import asyncio
import websockets

async def echo(websocket):
    async for message in websocket:
        print(f"Received from client: {message}")
        await websocket.send(f"Echo: {message}")

async def main():
    async with websockets.serve(echo, "localhost", 8765):
        print("WebSocket server listening on ws://localhost:8765")
        await asyncio.Future() 

if __name__ == "__main__":
    asyncio.run(main())