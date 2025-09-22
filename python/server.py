
import asyncio
import websockets

async def handler(websocket):
    async for message in websocket:
        print(f"Received from Electron: {message}")
        # Send a response back
        await websocket.send(f"Python says: {message.upper()}")

async def main():
    async with websockets.serve(handler, "localhost", 8765):
        print("WebSocket server listening on ws://localhost:8765")
        await asyncio.Future() 

if __name__ == "__main__":
    asyncio.run(main())