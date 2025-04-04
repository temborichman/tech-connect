import Image from "next/image";
import Splash from "./splash/page";
import GetStartedScreen from "./get-started/page"; 
import SignScreen from "./sign/page";
import SignUpPage from "./signin/page";
import InterestsScreen from "./interests/page";
import HomeScreen from "./homescreen/page";


export default function Home() {
  return (
    <div>
      <Splash />
      <GetStartedScreen />
      <SignScreen />
      <SignUpPage />
      <InterestsScreen />
      <HomeScreen />

    </div>
  );
}
