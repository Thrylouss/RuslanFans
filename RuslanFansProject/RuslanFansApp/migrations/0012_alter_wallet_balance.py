# Generated by Django 4.2.15 on 2024-09-23 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('RuslanFansApp', '0011_remove_bookmark_person_alter_wallet_balance'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wallet',
            name='balance',
            field=models.DecimalField(decimal_places=2, default=526, max_digits=10),
        ),
    ]
