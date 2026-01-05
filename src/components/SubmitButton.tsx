import { Button, type ButtonProps } from "@mui/material";
import { Form, type FormInstance } from "antd";
import React from "react";

interface SubmitButtonProps extends Omit<ButtonProps, "form"> {
  form: FormInstance;
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
  form,
  disabled,
  children,
  ...rest
}) => {
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button type="submit" disabled={!submittable || disabled} {...rest}>
      {children}
    </Button>
  );
};

export default SubmitButton;
