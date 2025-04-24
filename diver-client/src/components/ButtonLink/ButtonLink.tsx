import { Link } from 'wouter';
import Button from '@mui/material/Button';

interface ButtonLinkProps {
  to: string;
  title: string;
}
function ButtonLink(props: ButtonLinkProps) {
  return (
    <Link to={props.to}>
      <Button variant="outlined">{props.title}</Button>
    </Link>
  );
}

export default ButtonLink;
