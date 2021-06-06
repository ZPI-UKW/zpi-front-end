import { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { useAuthContextState } from '../../../context/authContext';
import { annoucements } from '../../../data/annoucements';
import { AnnoucementControlProps, RouteParams } from './types';

const AnnocementControl = ({ initialValues, setInitialValues }: AnnoucementControlProps) => {
  const {
    userInfo: { email, name, phonenumber },
  } = useAuthContextState();
  const { pathname } = useLocation();
  const params = useParams<RouteParams>();
  const history = useHistory();

  useEffect(() => {
    const user = {
      email,
      name,
      phone: phonenumber,
    };

    if (pathname === '/create-advertisement') {
      setInitialValues({
        ...initialValues,
        ...user,
      });
    } else {
      const { addId } = params;
      const annoucement = annoucements.find((el) => el._id === addId);

      if (annoucement === undefined) {
        history.push('/');
        return;
      }

      const { title, description, costs, location, email, phone, images, categoryId } = annoucement;

      setInitialValues({
        ...user,
        title,
        description,
        costs,
        location,
        email,
        phone,
        images,
        categoryId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default AnnocementControl;
