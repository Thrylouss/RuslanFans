import random
from datetime import datetime, timedelta

from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="profile_pics", blank=True, null=True)
    bio = models.TextField(max_length=500, blank=True)
    header_image = models.ImageField(upload_to="header_pics", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    cost = models.FloatField(default=0)

    def __str__(self):
        return f"{self.user.username} Profile"


class Posts(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField()
    image = models.ImageField(upload_to="images/")
    likes = models.ManyToManyField(User, related_name="likes", blank=True)
    liked = models.BooleanField()
    cost = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} by {self.profile.user.username}"


class Comments(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name="comments")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author.username} Commented"


class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name="marked_post", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}  Bookmarked"


class Notifications(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="sender", null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} Notification"


class Messages(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} Message"


class Subscriptions(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subscribed_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name="subscribed_to")
    is_active = models.BooleanField(default=False)
    start_date = models.DateTimeField(auto_now_add=True, null=True)
    end_date = models.DateTimeField(blank=True, null=True, default=None)

    # def plus_one_month(self):
    #     self.end_date = self.end_date + datetime.timedelta(days=30)

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        if not self.end_date:
            self.end_date = datetime.now() + timedelta(days=30)
        super().save()

    def __str__(self):
        return f"{self.user.username} Subscribed to {self.subscribed_to.username}"


class Wallet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    card_type = [
        ("Visa", "Visa"),
        ("MasterCard", "MasterCard"),
        ("American Express", "American Express"),
        ("Discover", "Discover"),
        ("UzCard", "UzCard"),
        ("Humo", "Humo"),
    ]
    company = models.CharField(max_length=20, choices=card_type, default="Visa")
    expiry = models.DateField()
    number = models.CharField(max_length=16, unique=True)
    cvv = models.CharField(max_length=3)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=random.randint(0, 1000))

    def top_up(self, amount):
        self.balance += amount

        TransactionHistory.objects.create(
            wallet=self,
            amount=amount,
            transaction_type="top_up",
        )

        self.save()

    def withdraw(self, amount):
        if self.balance >= amount:
            self.balance -= amount
            self.save()

            TransactionHistory.objects.create(
                wallet=self,
                amount=amount,
                transaction_type="withdraw",
            )

            return True
        else:
            return False

    def __str__(self):
        return f"{self.user.username} Wallet: {self.balance}"


class TransactionHistory(models.Model):
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    TRANSACTION_TYPE = [
        ("top_up", "top_up"),
        ("withdraw", "withdraw"),
    ]
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.wallet.user.username} Transaction: {self.amount}"