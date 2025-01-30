import { Alert, Box, Center, HStack, Text, VStack } from "native-base";

export const Success = ({ title, message }) => (
    <Center justifyContent="center">
      <VStack space={5} maxW="400">
        <Alert w="100%" status="success" variant="left-accent">
          <HStack alignItems="center" space={2}>
            {/* <Alert.Icon size="md" /> */}
            <Text>{title}</Text>
            <Box flex={1} _text={{ textAlign: "center" }} ml={5} _dark={{ color: "coolGray.600" }}>
              {message}
            </Box>
          </HStack>
        </Alert>
      </VStack>
    </Center>
  );
  
  // Failed Alert Component
  export const Failed = ({ title, message }) => (
    <Center justifyContent="center">
      <VStack space={5}>
        <Alert w="100%" status="error" variant="left-accent">
          <HStack alignItems="center" space={2}>
            {/* <Alert.Icon size="md" /> */}
            <Text>{title}</Text>
            <Box flex={1} _text={{ textAlign: "center" }} ml={5} _dark={{ color: "coolGray.600" }}>
              {message}
            </Box>
          </HStack>
        </Alert>
      </VStack>
    </Center>
  );
  
  // Pending Alert Component
  export const Pending = ({ title, message }) => (
    <Center justifyContent="center">
      <VStack space={5}>
        <Alert w="100%" status="warning" variant="left-accent">
          <HStack alignItems="center" space={2}>
            {/* <Alert.Icon size="md" /> */}
            <Text>{title}</Text>
            <Box flex={1} _text={{ textAlign: "center" }} ml={5} _dark={{ color: "coolGray.600" }}>
              {message}
            </Box>
          </HStack>
        </Alert>
      </VStack>
    </Center>
  );