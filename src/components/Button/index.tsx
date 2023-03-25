import { TouchableOpacityProps } from "react-native";
import { ButtonTypesStyleProps, Container, Title } from "./styles";

type Props = TouchableOpacityProps & {
    title: string;
    type?: ButtonTypesStyleProps;
}

export function Button({ title, type = 'PRIMARY', ...rest }: Props) {
    return (
        <Container 
            type={type}           
            {...rest}
        >
            <Title>
                {title}
            </Title>
        </Container>
    )
}
