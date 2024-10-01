# CarMinder
CaReminder is a smart pill dispenser that integrates with a mobile application to provide precise medication management. The device automatically dispenses pills at scheduled times and sends real-time notifications to users.

Note: The mobile app is currently not available on the app store. You can access it by building it locally using React Native.

## Setup
1. Clone the Repository:
```bash
git clone https://github.com/your-username/CaReminder.git
```

2. Install Dependencies:
```bash
cd client
npm install
cd server
npm install
```
3. Set Up MySQL Database:
Create a MySQL database and user with appropriate privileges. Replace the placeholders in the .env file with your database credentials.

4. Run the Development Server:
```bash
# In the client directory
npm start
# In the server directory
npm start
```

## Usage
1. Mobile App: Build the mobile app using React Native and install it on your device.
2. Create an Account: Set up an account in the app and configure your medication schedule.
3. Place Pills: Place your pills in the dispenser.
4. Receive Notifications: The app will send notifications and the dispenser will dispense pills at the scheduled times.

## Technologies Used
- Frontend: React Native
- Backend: Node.js, Express.js
- Database: MySQL
- Microcontroller: ESP32
- CAD Software: SolidWorks

## Contributions
Contributions are welcome! Please feel free to fork the repository and submit pull requests.

## License
This project is licensed under the MIT License.   
