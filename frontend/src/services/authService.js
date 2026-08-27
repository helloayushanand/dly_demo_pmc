const SESSION_STORAGE_KEY = "dly_pmc_admin_session";

const DEMO_ADMIN = {
  username: "admin",
  password: "Admin@123",
  displayName: "Admin User",
  role: "Administrator",
};

const createSession = () => {
  return {
    username: DEMO_ADMIN.username,
    displayName: DEMO_ADMIN.displayName,
    role: DEMO_ADMIN.role,
    loginTime: new Date().toISOString(),
  };
};

export const loginAdmin = async (username, password) => {
  await new Promise((resolve) => {
    window.setTimeout(resolve, 650);
  });

  const normalizedUsername = username
    .trim()
    .toLowerCase();

  const credentialsAreValid =
    normalizedUsername === DEMO_ADMIN.username &&
    password === DEMO_ADMIN.password;

  if (!credentialsAreValid) {
    throw new Error(
      "Incorrect username or password. Please use the demo admin credentials."
    );
  }

  const session = createSession();

  localStorage.setItem(
    SESSION_STORAGE_KEY,
    JSON.stringify(session)
  );

  return session;
};

export const getAdminSession = () => {
  const storedSession = localStorage.getItem(
    SESSION_STORAGE_KEY
  );

  if (!storedSession) {
    return null;
  }

  try {
    return JSON.parse(storedSession);
  } catch {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return null;
  }
};

export const logoutAdmin = () => {
  localStorage.removeItem(SESSION_STORAGE_KEY);
};

export const getDemoCredentials = () => {
  return {
    username: DEMO_ADMIN.username,
    password: DEMO_ADMIN.password,
  };
};