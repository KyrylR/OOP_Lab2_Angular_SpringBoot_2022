package ua.univ.autobase_backend.utils;

import ua.univ.autobase_backend.exceptions.IncorrectParameterException;

public class ServerUtils {
    public static int parseParameterId(String id) {
        int intId = -1;
        try {
            intId = Integer.parseInt(id);
        } catch (NumberFormatException ex) {
            throw new IncorrectParameterException("Bad driver id parameter!");
        }
        return intId;
    }
}
