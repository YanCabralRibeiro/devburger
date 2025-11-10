import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51SOzOH0yp5dLHWDSVdzpO32dLA6dJwBE2KexRmQEkjUF7ErzMbyg2tQ30xvUiiNTENqWHbQRJ4zQPXaj3CgAeoiQ00ywOW3HBl");

export default stripePromise;