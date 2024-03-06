import react from "react"

// ui imports
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

const AuthForm = () => {

    const signUpForm = (
        <div className="flex flex-col gap-y-4">
            {/* username */}
            <div className="flex flex-col gap-y-2">
                <Label htmlFor="username" className="">Username</Label>
                <Input id="username" placeholder="BallDontLie" className="" />
                <p className="text-xs italic font-light text-red-500">This username is taken!</p>
            </div>

            {/* email */}
            <div className="flex flex-col gap-y-2">
                <Label htmlFor="email" className="">Email</Label>
                <Input id="email" placeholder="test@email.com" className="" />
                <p className="text-xs italic font-light text-red-500 ">Please enter a valid email!</p>
            </div>

            {/* password */}
            <div className="flex flex-col gap-y-2">
                <Label htmlFor="password" className="">Password</Label>
                <Input id="password" placeholder="********" className="" />
                <p className="text-xs italic font-light">Password must be at least 8 characters long, and include at least 1 number and 1 of the following symbols: !@#$%^(){}</p>
            </div>

            {/* confirm password */}
            <div className="flex flex-col gap-y-2">
                <Label htmlFor="confirm_password" className="">Confirm Password</Label>
                <Input id="confirm_password" placeholder="********" className="" />
                <p className="text-xs italic font-light text-red-500">Passwords do not match!</p>
            </div>

            <Button className="" type="submit">Sign Up</Button>
        </div>
    )

    const loginForm = (
        <div className="flex flex-col gap-y-4">
            {/* username */}
            <div className="flex flex-col gap-y-2">
                <Label htmlFor="username" className="">Username</Label>
                <Input id="username" placeholder="BallDontLie" className="" />
                <p className="text-xs italic font-light text-red-500">No user with this username!</p>
            </div>

            {/* email
            <div className="flex flex-col gap-y-2">
                <Label htmlFor="email" className="">Email</Label>
                <Input id="email" placeholder="test@email.com" className="" />
                <p className="text-xs italic font-light text-red-500 ">Please enter a valid email!</p>
            </div> */}

            {/* password */}
            <div className="flex flex-col gap-y-2">
                <Label htmlFor="password" className="">Password</Label>
                <Input id="password" placeholder="********" className="" />
                <p className="text-xs italic font-light w-fit hover:underline hover:cursor-pointer">Forgot Password?</p>
            </div>

            <Button className="" type="submit">Log In</Button>
        </div>
    )

    return (
        <form>
            {signUpForm}
        </form>
    )
}

export default AuthForm