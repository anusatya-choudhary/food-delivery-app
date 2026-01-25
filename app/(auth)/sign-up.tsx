import { Text, View } from "react-native";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";


const SignUp: React.FC = () => {
  return (
    <View>
      <Text>Sign Up</Text>
      <TouchableOpacity onPress={() => router.push("/sign-in")}>
        <Text className="text-center text-[#007aff] text-base font-semibold">Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;