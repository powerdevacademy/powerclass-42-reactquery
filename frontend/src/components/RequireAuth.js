import React from 'react';
import { useQuery } from 'react-query';
import { Redirect } from 'react-router-dom';
import api from '../services/api';

const RequireAuth = (ComposedComponent) => {

    const HOF = () => {
        const { data, isLoading } = useQuery('session', api.user.me, {retry: false});
        const isUserLogged = !!data;

        if(isLoading) 
            return <div>Carregando...</div>

        return isUserLogged 
            ?
            <ComposedComponent />
            :
            <Redirect to="/login" />
    };

    return HOF;

};

export default RequireAuth;
