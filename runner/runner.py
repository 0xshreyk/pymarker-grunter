class Greeter:
    def __init__(self, greeting):
        self.greeting = greeting

    def say_hello(self):
        return f"{self.greeting}, World!"

class PersonalizedGreeter(Greeter):
    def __init__(self, greeting, name):
        super().__init__(greeting)
        self.name = name

    def say_hello(self):
        return f"{self.greeting}, {self.name}!"

if __name__ == "__main__":
    greeter = Greeter("Hello")
    print(greeter.say_hello())

    personalized_greeter = PersonalizedGreeter("Hello", "Alice")
    print(personalized_greeter.say_hello())
