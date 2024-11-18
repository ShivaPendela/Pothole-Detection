
import motor.motor_asyncio


client = motor.motor_asyncio.AsyncIOMotorClient('mongodb+srv://shiva1566:8688921162@cluster0.r7lg0ih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db=client.Road
collection=db.detection
