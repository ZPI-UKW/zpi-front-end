import { annoucements } from '../../../data/annoucements';
import { RouteTypeFunc, Initial } from './types';

export const initial: Initial = {
  title: '',
  location: '',
  phone: '',
  email: '',
  description: '',
  costs: {
    day: 0,
    week: 0,
    month: 0,
  },
};

export const routeType: RouteTypeFunc = (
  pathname,
  initialValues,
  params,
  userInfo,
  setInitialValues,
  history
) => {
  const user = {
    email: userInfo.email,
    name: userInfo.name,
    phone: userInfo.phonenumber,
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

    const { title, description, costs, location, email, phone } = annoucement;

    setInitialValues({
      ...user,
      title,
      description,
      costs,
      location,
      email,
      phone,
    });
  }
};
