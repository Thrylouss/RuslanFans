# Generated by Django 4.2.15 on 2024-09-21 19:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('RuslanFansApp', '0007_alter_wallet_balance'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wallet',
            name='balance',
            field=models.DecimalField(decimal_places=2, default=270, max_digits=10),
        ),
    ]
