import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { GET_ANNOUCEMENT_BY_ID } from '../../../graphql/annoucement';
import { AnnoucementControlProps, QueryDataGetAnn, QueryVarsGetAnn, RouteParams } from './types';
import { useAuthContextState } from '../../../context/auth/authContext';

const AnnocementControl = ({ initialValues, setInitialValues }: AnnoucementControlProps) => {
  const {
    userInfo: { email, name, phonenumber },
  } = useAuthContextState();
  const { pathname } = useLocation();
  const params = useParams<RouteParams>();
  const history = useHistory();
  const [GetAnnoucement, { data, error }] = useLazyQuery<QueryDataGetAnn, QueryVarsGetAnn>(
    GET_ANNOUCEMENT_BY_ID
  );

  useEffect(() => {
    const user = {
      email,
      name,
      phonenumber,
    };

    if (pathname === '/create-advertisement') {
      setInitialValues({
        ...initialValues,
        ...user,
      });
    } else {
      const { addId } = params;
      GetAnnoucement({ variables: { id: addId } });

      if (!error && data?.getAnnoucement) {
        const { title, description, costs, location, email, phonenumber, images } =
          data.getAnnoucement;

        setInitialValues({
          ...user,
          title,
          description,
          costs,
          location,
          email,
          phonenumber,
          images,
        });
      }

      if (error !== undefined) {
        history.push('/');
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data]);

  return null;
};

export default AnnocementControl;
