import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";


const SignIn: React.FC = () => {
  return (
    <View>
      <Text>Sign In</Text>
      <TouchableOpacity onPress={() => router.push("/sign-up")}>
        <Text className="text-center text-[#007aff] text-base font-semibold">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;