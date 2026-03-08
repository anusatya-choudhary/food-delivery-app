import { Alert, Text, View } from "react-native";
import { Link, router } from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import { createUser } from "@/lib/appwrite";
import * as Sentry from '@sentry/react-native';


const SignUp: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    const {name, email, password} = form
    if (name === '' || email === '' || password === '') {
      Alert.alert('Error', 'Please fill valid name, email and password');
      return;
    }
    setIsSubmitting(true);
    try {
      await createUser({name, email, password});
      router.replace('/');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
      Sentry.captureException(error, {
        level: 'warning',
        fingerprint: ['sign-up', 'auth-error'],
        tags: {
          feature: 'auth',
          screen: 'sign-up',
        },
        extra: {
          hasName: !!form.name,
          hasEmail: !!form.email,
          hasPassword: !!form.password,
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">

      <CustomInput
        placeholder="Enter your name"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        label="Name"
        keyboardType="default"
      />

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

      <CustomButton title="Sign Up" loading={isSubmitting} onPress={handleSubmit} />

      <View className="flex justify-center flex-row mt-5 gap-2">
        <Text className="base-regular text-gray-100">
          Already have an account?
        </Text>
        <Link href={"/sign-in"} className="base-bold text-primary">
          Sign in
        </Link>
      </View>
    </View>
  );
};

export default SignUp;