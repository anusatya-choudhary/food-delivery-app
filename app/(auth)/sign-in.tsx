import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";


const SignIn: React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    if (form.email === '' || form.password === '') {
      Alert.alert('Error', 'Please fill valid email and password');
    }
    setIsSubmitting(true);
    try {
      // Call appwrite sign-in function
      Alert.alert('Success', 'User signed in successfully');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">

      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />

      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
        label="Password"
        keyboardType="default"
        secureTextEntry={true}
      />

      <CustomButton title="Sign In" loading={isSubmitting} onPress={handleSubmit} />

      <View className="flex justify-center flex-row mt-5 gap-2">
        <Text className="base-regular text-gray-100">
          Don't have an account?
        </Text>
        <Link href={"/sign-up"} className="base-bold text-primary">
          Sign up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;