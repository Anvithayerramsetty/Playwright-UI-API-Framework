import { test } from '../..//fixtures/Fixtures';
if(!process.env.USER_EMAIL ||!process.env.USER_PASSWORD){
  throw new Error("Logged in credentials are not valid")
}

test.use({
storageState:{
  cookies:[],
  origins:[]
}
});

test('LoginPage', async ({ loginpage }) => {

  await loginpage.goto();

  await loginpage.login(
    process.env.USER_EMAIL!,
    process.env.USER_PASSWORD!
  );

  await loginpage.verifySuccessfulLogin();
});